import { QuestionType } from '@prisma/client';

export interface QuizScoringStrategy {
  calculateScore(userAnswers: string[], context: QuestionContext): number;
  isCorrect(userAnswers: string[], context: QuestionContext): boolean;
}

export interface QuestionContext {
  id: string;
  type: QuestionType;
  options: {
    id: string;
    isCorrect: boolean;
    weight: number | null;
  }[];
}
