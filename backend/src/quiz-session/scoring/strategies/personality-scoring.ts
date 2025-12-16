import { QuizScoringStrategy, QuestionContext } from './interfaces';

export class PersonalityScoring implements QuizScoringStrategy {
  calculateScore(submittedOptionIds: string[], context: QuestionContext): number {
    // В этом типе теста мы не возвращаем числовой балл за вопрос.
    // Мы возвращаем 0, но будем использовать другую функцию в сессии для анализа.
    return 0;
  }

  isCorrect(_: string[], __: QuestionContext): boolean {
    return true;
  }
}
