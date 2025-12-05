import {
  SessionStatus,
  ScoringAlgorithm,
  UserAnswer,
  // QuizSession,
} from '@prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionContext, QuizScoringStrategy } from './scoring/types';
import { StrictScoring } from './scoring/strict-scoring';
import { PartialScoring } from './scoring/partial-scoring';
import { WeightedScoring } from './scoring/weight-scoring';
import { PrismaService } from '../prisma.service';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

// interface SessionStateResult {
//   session: QuizSession;
//   status: 'resumed' | 'started' | 'completed';
//   nextQuestionId: string | null; // ID следующего вопроса, null если квиз закончен
// }

@Injectable()
export class QuizSessionService {
  constructor(private prisma: PrismaService) {}

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

  async getSessionState(userId: string, quizId: string) {
    // Ищем активную сессию с уже данными ответами
    const existingSession = await this.prisma.quizSession.findFirst({
      where: {
        userId,
        quizId,
        status: SessionStatus.IN_PROGRESS,
      },
      orderBy: { startedAt: 'desc' },
      include: { userAnswers: true },
    });

    if (existingSession) {
      // Сессия найдена, определяем следующий вопрос
      const answeredQuestionIds = existingSession.userAnswers.map(
        (ua) => ua.questionId,
      );
      const nextQuestion = await this.findNextUnansweredQuestion(
        quizId,
        answeredQuestionIds,
      );

      return {
        session: existingSession,
        status: 'resumed',
        nextQuestionId: nextQuestion?.id || null, // Если nextQuestion нет, значит, квиз закончен
      };
    }

    // Если сессии нет, создаем новую
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: { orderBy: { order: 'asc' } } }, // Загружаем вопросы сразу
    });

    if (!quiz || quiz.questions.length === 0) {
      throw new BadRequestException('Квиз не найден или не содержит вопросов.');
    }

    const newSession = await this.prisma.quizSession.create({
      data: {
        userId,
        quizId,
        startedAt: new Date(),
        status: SessionStatus.IN_PROGRESS,
      },
      include: { questions: true },
    });

    // Для новой сессии следующий вопрос - это самый первый вопрос в списке
    const firstQuestionId = quiz.questions[0].id;

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
    const session = await this.prisma.quizSession.findUnique({
      where: { id: sessionId, status: SessionStatus.IN_PROGRESS },
    });

    if (!session) {
      throw new BadRequestException('Сессия не активна или не найдена.');
    }

    // TODO: Здесь должна быть проверка времени, если квиз ограничен по времени

    await this.prisma.quizSession.update({
      where: { id: sessionId },
      data: { timeSpentSeconds },
    });

    return this.prisma.userAnswer.upsert({
      where: {
        sessionId_questionId: {
          sessionId: sessionId,
          questionId: questionId,
        },
      },
      update: {
        submittedOptionIds: submittedOptionIds,
        submittedAnswerText: submittedAnswerText,
      },
      create: {
        sessionId: sessionId,
        questionId: questionId,
        submittedOptionIds: submittedOptionIds,
        submittedAnswerText: submittedAnswerText,
      },
    });
  }

  /**
   * Финализирует сессию, подсчитывает результаты и обновляет статистику.
   */
  async completeSession(sessionId: string) {
    const session = await this.prisma.quizSession.findUnique({
      where: { id: sessionId },
      // Загружаем связанные данные, необходимые для расчетов и статистики
      include: {
        quiz: {
          include: {
            questions: {
              include: {
                options: true,
              },
            },
          },
        },
        userAnswers: true,
        user: true,
      },
    });

    if (!session || session.status !== SessionStatus.IN_PROGRESS) {
      throw new BadRequestException('Сессия не может быть завершена.');
    }

    // 1. Выбираем стратегию подсчета (по умолчанию STRICT_MATCH для пользовательских квизов)
    const strategyType =
      session.quiz.scoringAlgorithm || ScoringAlgorithm.STRICT_MATCH;
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

    // 2. Подсчет баллов за каждый ответ в цикле
    // for (const userAnswer of session.userAnswers) {
    //   // Получаем вопрос целиком с опциями, чтобы создать контекст для стратегии
    //   const questionWithOptions = await this.prisma.question.findUnique({
    //     where: { id: userAnswer.questionId },
    //     include: { options: true }, // Загружаем все опции вопроса
    //   });
    //
    //   if (!questionWithOptions) continue;
    //
    //   // Формируем объект контекста, соответствующий интерфейсу QuestionContext
    //   const context: QuestionContext = {
    //     id: questionWithOptions.id,
    //     type: questionWithOptions.type,
    //     options: questionWithOptions.options.map((opt) => ({
    //       id: opt.id,
    //       isCorrect: opt.isCorrect,
    //       weight: opt.weight || null,
    //     })),
    //   };
    //
    //   // Применяем выбранную стратегию для вычисления результата конкретного вопроса
    //   const score = scoringEngine.calculateScore(
    //     userAnswer.submittedOptionIds,
    //     context,
    //   );
    //
    //   const isCorrect = scoringEngine.isCorrect(
    //     userAnswer.submittedOptionIds,
    //     context,
    //   );
    //
    //   totalScore += score;
    //
    //   // Обновляем флаг isCorrect в UserAnswer в БД
    //   await this.prisma.userAnswer.update({
    //     where: { id: userAnswer.id },
    //     data: { isCorrect },
    //   });
    // }

    // 3. Обновление сессии: статус, время, итоговый балл
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

  async updateSessionTime(sessionId: string, timeSpentSeconds: number) {
    return this.prisma.quizSession.update({
      where: { id: sessionId },
      data: { timeSpentSeconds },
    });
  }
}
