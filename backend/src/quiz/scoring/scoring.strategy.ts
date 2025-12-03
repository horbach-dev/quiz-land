export interface QuizScoringStrategy {
  calculateScore(userAnswers: string[], correctAnswers: string[]): number;
  isCorrect(userAnswers: string[], correctAnswers: string[]): boolean;
}
