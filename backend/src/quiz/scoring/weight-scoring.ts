import { QuizScoringStrategy, QuestionContext } from './types';

export class WeightedScaleScoring implements QuizScoringStrategy {
  calculateScore(userAnswers: string[], context: QuestionContext): number {
    let totalScore = 0;

    const optionsMap = new Map(
      context.options.map((opt) => [opt.id, opt.weight || 0]),
    );

    userAnswers.forEach((answerId) => {
      const weight = optionsMap.get(answerId);
      if (weight !== undefined) {
        totalScore += weight;
      }
    });

    return totalScore;
  }

  isCorrect(_: string[], __: QuestionContext): boolean {
    // В тестах на самочувствие понятие "правильно/неправильно" отсутствует
    return true;
  }
}
