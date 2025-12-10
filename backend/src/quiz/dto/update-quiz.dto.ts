import { ScoringAlgorithm } from '@prisma/client';

export class UpdateOptionDto {
  id?: string;
  text: string;
  isCorrect: boolean;
  image?: string;
}

export class UpdateQuestionDto {
  id?: string;
  text: string;
  order: number;
  image?: string;
  type: string;
  options?: UpdateOptionDto[];
}

export class UpdateQuizDto {
  title?: string;
  description?: string;
  poster?: string;
  loadedImg?: string;
  isPublic?: boolean;
  scoringAlgorithm?: ScoringAlgorithm;
  limitedByTime?: boolean;
  questions?: UpdateQuestionDto[];
}
