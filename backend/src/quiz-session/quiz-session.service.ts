import { SessionStatus, ScoringAlgorithm } from '@prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionContext, QuizScoringStrategy } from './scoring/types';
import { StrictScoring } from './scoring/strict-scoring';
import { PartialScoring } from './scoring/partial-scoring';
import { WeightedScoring } from './scoring/weight-scoring';
import { PrismaService } from '../prisma.service';

@Injectable()
export class QuizSessionService {
  constructor(private prisma: PrismaService) {}

  // Доступные стратегий подсчета баллов
  private scoringStrategies: Record<ScoringAlgorithm, QuizScoringStrategy> = {
    STRICT_MATCH: new StrictScoring(),
    PARTIAL_CREDIT: new PartialScoring(),
    WEIGHTED_SCALE: new WeightedScoring(),
  };

  async startSession(userId: string, quizId: string) {
    // 1. Проверяем наличие незавершенной сессии
    const existingSession = await this.prisma.quizSession.findFirst({
      where: {
        userId,
        quizId,
        status: SessionStatus.IN_PROGRESS,
      },
      orderBy: { startedAt: 'desc' },
    });

    if (existingSession) {
      // Предлагаем пользователю продолжить с того же места
      return { session: existingSession, status: 'resumed' };
    }

    // 2. Проверяем, существует ли квиз
    const quiz = await this.prisma.quiz.findUnique({ where: { id: quizId } });

    if (!quiz) {
      throw new BadRequestException('Квиз не найден.');
    }

    // 3. Создаем новую сессию
    const newSession = await this.prisma.quizSession.create({
      data: {
        userId,
        quizId,
        startedAt: new Date(),
        status: SessionStatus.IN_PROGRESS,
      },
    });

    return { session: newSession, status: 'started' };
  }

  /**
   * Записывает ответ пользователя на вопрос.
   * Можно расширить для обработки одного ответа за раз, или сразу всех ответов на странице вопроса (MULTI_CHOICE).
   */
  async submitAnswer(
    sessionId: string,
    questionId: string,
    submittedOptionIds: string[],
    submittedAnswerText?: string,
  ) {
    const session = await this.prisma.quizSession.findUnique({
      where: { id: sessionId, status: SessionStatus.IN_PROGRESS },
    });

    if (!session) {
      throw new BadRequestException('Сессия не активна или не найдена.');
    }

    // TODO: Здесь должна быть проверка времени, если квиз ограничен по времени

    // TODO: Проверка, отвечал ли пользователь уже на этот вопрос в этой сессии

    // Сохраняем ответ
    const userAnswer = await this.prisma.userAnswer.create({
      data: {
        sessionId,
        questionId,
        submittedOptionIds,
        submittedAnswerText,
      },
    });

    // Опционально: Обновляем timeSpentSeconds в QuizSession
    // Это можно делать в отдельном запросе при каждом ответе или при завершении.

    return userAnswer;
  }

  /**
   * Финализирует сессию, подсчитывает результаты и обновляет статистику.
   */
  async completeSession(sessionId: string) {
    const session = await this.prisma.quizSession.findUnique({
      where: { id: sessionId },
      // Загружаем связанные данные, необходимые для расчетов и статистики
      include: {
        quiz: true,
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

    // 2. Подсчет баллов за каждый ответ в цикле
    for (const userAnswer of session.userAnswers) {
      // Получаем вопрос целиком с опциями, чтобы создать контекст для стратегии
      const questionWithOptions = await this.prisma.question.findUnique({
        where: { id: userAnswer.questionId },
        include: { options: true }, // Загружаем все опции вопроса
      });

      if (!questionWithOptions) continue;

      // Формируем объект контекста, соответствующий интерфейсу QuestionContext
      const context: QuestionContext = {
        id: questionWithOptions.id,
        type: questionWithOptions.type,
        options: questionWithOptions.options.map((opt) => ({
          id: opt.id,
          isCorrect: opt.isCorrect,
          weight: opt.weight || null,
        })),
      };

      // Применяем выбранную стратегию для вычисления результата конкретного вопроса
      const score = scoringEngine.calculateScore(
        userAnswer.submittedOptionIds,
        context,
      );
      const isCorrect = scoringEngine.isCorrect(
        userAnswer.submittedOptionIds,
        context,
      );

      totalScore += score;

      // Обновляем флаг isCorrect в UserAnswer в БД
      await this.prisma.userAnswer.update({
        where: { id: userAnswer.id },
        data: { isCorrect },
      });
    }

    // 3. Обновление сессии: статус, время, итоговый балл
    const completedAt = new Date();
    // Вычисляем общее затраченное время в секундах
    const timeSpentSeconds = Math.floor(
      (completedAt.getTime() - session.startedAt.getTime()) / 1000,
    );

    const completedSession = await this.prisma.quizSession.update({
      where: { id: sessionId },
      data: {
        status: SessionStatus.COMPLETED,
        completedAt,
        timeSpentSeconds: timeSpentSeconds,
        score: totalScore,
      },
    });

    // 4. Обновление общей статистики пользователя
    // await this.updateUserStatistics(session.userId, session.quizId, totalScore);

    return completedSession;
  }
}
