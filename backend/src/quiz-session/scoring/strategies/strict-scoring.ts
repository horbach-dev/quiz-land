import { QuizScoringStrategy, QuestionContext } from './interfaces';

export class StrictScoring implements QuizScoringStrategy {
  calculateScore(userAnswers: string[], context: QuestionContext): number {
    const correctAnswers = context.options
      .filter((opt) => opt.isCorrect)
      .map((opt) => opt.id);

    const userSet = new Set(userAnswers);
    const correctSet = new Set(correctAnswers);

    const isMatch =
      userSet.size === correctSet.size &&
      [...userSet].every((value) => correctSet.has(value));

    return isMatch ? 1 : 0;
  }

  isCorrect(userAnswers: string[], context: QuestionContext): boolean {
    return this.calculateScore(userAnswers, context) === 1;
  }
}
