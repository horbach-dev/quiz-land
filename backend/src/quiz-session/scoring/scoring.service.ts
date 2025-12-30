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

type TDataResult = {
  from?: number;
  to?: number;
  text: string;
  title?: string;
  category?: string;
  conditions?: {
    category: string;
    moreOrEqual: number | string | null;
    lessOrEqual: number | string | null;
  }[];
};

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

    const results = session.quiz.results as TDataResult[];
    let feedback: string | null = null;

    if (results) {
      feedback =
        results.find((feed) => {
          return (
            totalScore >= Number(feed.from) && totalScore <= Number(feed.to)
          );
        })?.text || null;
    }

    return { totalScore, feedback, updates };
  }

  // Вспомогательный метод для тестов личности
  private calculatePersonalityResult(session: FullQuizSession) {
    if (!session) return null;

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

    const results = session.quiz.results as TDataResult[] | undefined;
    let dominantCategory: string | null = null;

    const categories = session.quiz.questionCategories as {
      text: string;
      id: string;
      count: number;
    }[];

    // Подготавливаем статистику для ответа
    const categoryStatistic = categories.map((category) => ({
      id: category.id,
      title: category.text,
      value: categoryCounts[category.id] || 0,
      count: category.count || 0,
    }));

    // Определяем доминирующую категорию (кто набрал больше "голосов")
    // Если небыли заданы условия
    if (results && !results?.[0]?.conditions) {
      let maxCount = 0;
      for (const key in categoryCounts) {
        if (categoryCounts[key] > maxCount) {
          maxCount = categoryCounts[key];
          dominantCategory = key;
        }
      }

      const finalCategory =
        (
          session.quiz.questionCategories as { text: string; id: string }[]
        ).find((feed) => {
          return feed.id === dominantCategory;
        })?.text || null;

      const feedback = results
        ? results.find((feed) => feed.category === dominantCategory)?.text
        : null;

      return { finalCategory, feedback, categoryStatistic };
    }

    if (results?.[0].conditions) {
      let finalCategory: string | null = null;
      let feedback: string | null = null;

      // Ищем результат, у которого ВЫПОЛНЯЮТСЯ ВСЕ условия
      for (const result of results) {
        if (!result.conditions || result.conditions.length === 0) continue;

        const isMatch = result.conditions.every((condition) => {
          const points = categoryCounts[condition.category] || 0;

          const numericMin = condition.moreOrEqual
            ? Number(condition.moreOrEqual)
            : -Infinity;

          const numericMax = condition.lessOrEqual
            ? Number(condition.lessOrEqual)
            : Infinity;

          return points >= numericMin && points <= numericMax;
        });

        if (isMatch) {
          finalCategory = result.title as string;
          feedback = result.text;
          break;
        }
      }

      return { finalCategory, feedback, categoryStatistic };
    }

    return null;
  }
}
