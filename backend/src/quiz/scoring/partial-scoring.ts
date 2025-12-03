import { QuestionContext, QuizScoringStrategy } from './types';

export class PartialScoring implements QuizScoringStrategy {
  calculateScore(userAnswers: string[], context: QuestionContext): number {
    // 1. Извлекаем ID правильных ответов из контекста
    const correctAnswersIds = context.options
      .filter((opt) => opt.isCorrect)
      .map((opt) => opt.id);

    if (correctAnswersIds.length === 0) {
      return 0;
    }

    let correctMatches = 0;
    const correctSet = new Set(correctAnswersIds);

    userAnswers.forEach((answerId) => {
      if (correctSet.has(answerId)) {
        correctMatches += 1;
      }
    });

    return correctMatches;
  }

  isCorrect(userAnswers: string[], context: QuestionContext): boolean {
    // Для этой стратегии "правильный" может означать "набран хотя бы 1 балл"
    return this.calculateScore(userAnswers, context) > 0;
  }
}
