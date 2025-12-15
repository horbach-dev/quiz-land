import {
  SessionStatus,
  ScoringAlgorithm,
  UserAnswer,
  Prisma,
} from '@prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionContext, QuizScoringStrategy } from './scoring/types';
import { StrictScoring } from './scoring/strict-scoring';
import { PartialScoring } from './scoring/partial-scoring';
import { WeightedScoring } from './scoring/weight-scoring';
import { PrismaService } from '../prisma.service';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { QuizSessionRepository } from './quiz-session.repository';

// interface SessionStateResult {
//   session: QuizSession;
//   status: 'resumed' | 'started' | 'completed';
//   nextQuestionId: string | null; // ID следующего вопроса, null если квиз закончен
// }

@Injectable()
export class QuizSessionService {
  constructor(
    private prisma: PrismaService,
    private repository: QuizSessionRepository,
  ) {}

  // Доступные стратегий подсчета баллов
  private scoringStrategies: Record<ScoringAlgorithm, QuizScoringStrategy> = {
    STRICT_MATCH: new StrictScoring(),
    PARTIAL_CREDIT: new PartialScoring(),
    WEIGHTED_SCALE: new WeightedScoring(),
  };

  private async findNextUnansweredQuestion(
    quizId: string,
    answeredIds: string[],
  ) {
    return this.prisma.question.findFirst({
      where: {
        quizId,
        id: { notIn: answeredIds },
      },
      orderBy: { order: 'asc' },
    });
  }

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
      const answeredQuestionIds = existingSession.userAnswers?.map((ua) => ua.questionId);

      const nextQuestion = await this.findNextUnansweredQuestion(
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
   * Можно расширить для обработки одного ответа за раз, или сразу всех ответов на странице вопроса (MULTI_CHOICE).
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
   * Финализирует сессию, подсчитывает результаты и обновляет статистику.
   */
  async completeSession(sessionId: string) {
    // Загружаем связанные данные, необходимые для расчетов и статистики
    const session = await this.repository.findFullSession(sessionId);

    if (!session || session.status !== SessionStatus.IN_PROGRESS) {
      throw new BadRequestException('Сессия не может быть завершена.');
    }

    // Выбираем стратегию подсчета (по умолчанию STRICT_MATCH)
    const strategyType = session.quiz.scoringAlgorithm;
    const scoringEngine = this.scoringStrategies[strategyType];

    let totalScore = 0;

    const updates: Promise<UserAnswer>[] = [];

    for (const userAnswer of session.userAnswers) {
      // Находим вопрос и его опции в уже загруженных данных
      const questionWithOptions = session.quiz.questions.find(
        (q) => q.id === userAnswer.questionId,
      );

      if (!questionWithOptions) continue;

      const context: QuestionContext = {
        id: questionWithOptions.id,
        type: questionWithOptions.type,
        options: questionWithOptions.options.map((opt) => ({
          id: opt.id,
          isCorrect: opt.isCorrect,
          weight: opt.weight || null,
        })),
      };

      const score = scoringEngine.calculateScore(
        userAnswer.submittedOptionIds,
        context,
      );

      const isCorrect = scoringEngine.isCorrect(
        userAnswer.submittedOptionIds,
        context,
      );

      totalScore += score;

      // Добавляем обновление в массив для пакетной записи
      updates.push(
        this.prisma.userAnswer.update({
          where: { id: userAnswer.id },
          data: { isCorrect },
        }),
      );
    }

    await Promise.all(updates);

    const completedAt = new Date();

    // 4. Обновление общей статистики пользователя
    // await this.updateUserStatistics(session.userId, session.quizId, totalScore);

    const updatedSession = await this.prisma.quizSession.update({
      where: { id: sessionId },
      data: {
        status: SessionStatus.COMPLETED,
        completedAt,
        score: totalScore,
      },
    });

    return {
      ...updatedSession,
      totalQuestions: session.quiz.questions.length,
    };
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
