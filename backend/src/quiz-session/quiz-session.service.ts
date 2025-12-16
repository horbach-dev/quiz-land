import { SessionStatus, Prisma, ScoringAlgorithm } from '@prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { QuizSessionRepository } from './quiz-session.repository';
import { ScoringService } from './scoring/scoring.service';

type TFeedback = {
  from?: number;
  to?: number;
  category?: string;
  text: string;
};

@Injectable()
export class QuizSessionService {
  constructor(
    private prisma: PrismaService,
    private repository: QuizSessionRepository,
    private scoring: ScoringService,
  ) {}

  /**
   * Стартуетм новую сессию или перезапускаем существующую.
   */
  async startSession(userId: string, quizId: string, restart: boolean) {
    let existingSession: Prisma.QuizSessionGetPayload<{
      include: { userAnswers: true };
    }> | null = null;

    if (restart) {
      // Удаляем все активные сессии пользователя для этого квиза
      await this.repository.deleteSession(userId, quizId);
    } else {
      // Ищем активную сессию с уже данными ответами
      existingSession = await this.repository.findActiveSession(userId, quizId);
    }

    if (existingSession) {
      // Сессия найдена (и это не был restart), возобновляем
      const answeredQuestionIds = existingSession.userAnswers?.map(
        (ua) => ua.questionId,
      );

      const nextQuestion = await this.repository.findNextUnansweredQuestion(
        quizId,
        answeredQuestionIds,
      );

      return {
        session: existingSession,
        status: 'resumed',
        nextQuestionId: nextQuestion?.id || null,
      };
    }

    // Если сессии нет (либо не найдена, либо удалена при рестарте), создаем новую

    const quiz = await this.repository.findQuiz(quizId);

    if (!quiz || quiz.questions.length === 0) {
      throw new BadRequestException('Квиз не найден или не содержит вопросов.');
    }

    const newSession = await this.repository.createSession(
      userId,
      quizId,
      quiz.scoringAlgorithm,
    );

    // Для новой сессии следующий вопрос - это самый первый вопрос в списке
    const firstQuestionId = quiz.questions[0].id; // Доступ к id первого элемента

    return {
      session: newSession,
      status: 'started',
      nextQuestionId: firstQuestionId,
    };
  }

  /**
   * Записывает ответ пользователя на вопрос.
   */
  async submitAnswer({
    sessionId,
    questionId,
    submittedOptionIds,
    submittedAnswerText,
    timeSpentSeconds,
  }: SubmitAnswerDto) {
    const session = await this.repository.findSession(sessionId);

    if (!session) {
      throw new BadRequestException('Сессия не активна или не найдена.');
    }

    // TODO: Здесь должна быть проверка времени, если квиз ограничен по времени

    await this.repository.updateSessionTime(sessionId, timeSpentSeconds);

    return this.repository.updateAnswer(
      sessionId,
      questionId,
      submittedOptionIds,
      submittedAnswerText,
    );
  }

  /**
   * Финализируем сессию, подсчитываем результаты и обновляет статистику.
   */
  async completeSession(sessionId: string) {
    // Загружаем связанные данные, необходимые для расчетов и статистики
    const session = await this.repository.findFullSession(sessionId);

    if (!session || session.status !== SessionStatus.IN_PROGRESS) {
      throw new BadRequestException('Сессия не может быть завершена.');
    }

    const result = this.scoring.calculateSessionResult(session);

    if (!result) return null;

    if ('updates' in result && result.updates.length > 0) {
      await Promise.all(result.updates);
    }

    // Обновление общей статистики пользователя
    // await this.updateUserStatistics(session.userId, session.quizId, totalScore);

    let feedback: string | null = null;
    const totalScore = 'totalScore' in result ? result.totalScore : 0;

    if ('totalScore' in result) {
      feedback = this.getFeedback({
        feedbacks: session.quiz.resultFeedbacks as TFeedback[],
        algorithm: session.scoringAlgorithm,
        score: totalScore,
        questionsLength: session.quiz.questions.length,
      });
    }

    if ('finalCategory' in result) {
      feedback = this.getFeedback({
        feedbacks: session.quiz.resultFeedbacks as TFeedback[],
        category: result.finalCategory,
      });
    }

    return this.prisma.quizSession.update({
      where: { id: sessionId },
      data: {
        status: SessionStatus.COMPLETED,
        completedAt: new Date(),
        score: totalScore,
        finalCategory: 'finalCategory' in result ? result.finalCategory : null,
        feedback,
      },
    });
  }

  getFeedback({
    score,
    category,
    feedbacks,
    algorithm,
    questionsLength = 0,
  }: {
    feedbacks: TFeedback[];
    algorithm?: ScoringAlgorithm;
    score?: number;
    category?: string | null;
    questionsLength?: number;
  }) {
    if (Array.isArray(feedbacks)) {
      if (category) {
        return (
          feedbacks.find((feed) => {
            return feed.text === category;
          })?.text || null
        );
      }

      if (score) {
        if (algorithm === ScoringAlgorithm.STRICT_MATCH) {
          const percent = (score / questionsLength) * 100;
          return (
            feedbacks.find((feed) => {
              return percent >= Number(feed.from) && percent <= Number(feed.to);
            })?.text || null
          );
        }

        return (
          feedbacks.find((feed) => {
            return score >= Number(feed.from) && score <= Number(feed.to);
          })?.text || null
        );
      }
    }

    return null;
  }

  async getCompletedSession(sessionId: string) {
    const session = await this.repository.findFullSession(sessionId);

    if (!session || session.status !== SessionStatus.COMPLETED) {
      throw new BadRequestException('Сессия не найдена или не завершена.');
    }

    return session;
  }

  async updateSessionTime(data: { sessionId: string; seconds: number }) {
    try {
      if (!data.sessionId || typeof data.seconds !== 'number') {
        throw new BadRequestException(
          'Не правильно переданы параметры sessionId или seconds',
        );
      }

      await this.repository.updateSessionTime(data.sessionId, data.seconds);
      return true;
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(e.message);
    }
  }
}
