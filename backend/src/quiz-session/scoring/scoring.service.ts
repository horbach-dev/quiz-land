import { Injectable } from '@nestjs/common';
import { ScoringAlgorithm, UserAnswer } from '@prisma/client';
import { QuizSessionRepository } from '../quiz-session.repository';
import { QuizScoringStrategy } from './strategies/interfaces';
import { StrictScoring } from './strategies/strict-scoring';
import { WeightedScoring } from './strategies/weight-scoring';
import { PersonalityScoring } from './strategies/personality-scoring';
import { QuestionContext } from './types';
import { PrismaService } from '../../prisma.service';

type FullQuizSession = Awaited<
  ReturnType<QuizSessionRepository['findFullSession']>
>;

@Injectable()
export class ScoringService {
  constructor(private prisma: PrismaService) {}

  private scoringStrategies: Record<ScoringAlgorithm, QuizScoringStrategy> = {
    STRICT_MATCH: new StrictScoring(),
    WEIGHTED_SCALE: new WeightedScoring(),
    PERSONALITY_TEST: new PersonalityScoring(),
  };

  /**
   * Считает баллы или определяет категорию для всей сессии.
   */
  public calculateSessionResult(session: FullQuizSession) {
    if (!session) return null;

    const strategyType = session.quiz.scoringAlgorithm;

    if (strategyType === ScoringAlgorithm.PERSONALITY_TEST) {
      return this.calculatePersonalityResult(session);
    } else {
      return this.calculateScoreResult(session, strategyType);
    }
  }

  // Вспомогательный метод для тестов по баллам
  private calculateScoreResult(
    session: FullQuizSession,
    strategyType: ScoringAlgorithm,
  ) {
    if (!session) return null;

    let totalScore = 0;
    const updates: Promise<UserAnswer>[] = [];
    const scoringEngine = this.scoringStrategies[strategyType];

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
          category: opt.category || null,
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

    return { totalScore, updates };
  }

  // Вспомогательный метод для тестов личности
  private calculatePersonalityResult(session: FullQuizSession) {
    if (!session) return null;

    let finalCategory: string | null = null;

    // Собираем все ответы и связанные с ними категории/шкалы
    const categoryCounts: Record<string, number> = {};

    for (const userAnswer of session.userAnswers) {
      const questionWithOptions = session.quiz.questions.find(
        (q) => q.id === userAnswer.questionId,
      );
      if (!questionWithOptions) continue;

      // Предполагаем, что у UserAnswer есть submittedOptionIds
      // И что Option имеет поле category
      for (const optionId of userAnswer.submittedOptionIds) {
        const selectedOption = questionWithOptions.options.find(
          (opt) => opt.id === optionId,
        );

        if (selectedOption && selectedOption.category) {
          const key = selectedOption.category;
          categoryCounts[key] = (categoryCounts[key] || 0) + 1;
        }
      }
    }

    // Определяем доминирующую категорию (кто набрал больше "голосов")
    let maxCount = 0;
    for (const key in categoryCounts) {
      if (categoryCounts[key] > maxCount) {
        maxCount = categoryCounts[key];
        finalCategory = key;
      }
    }

    return { finalCategory };
  }
}
