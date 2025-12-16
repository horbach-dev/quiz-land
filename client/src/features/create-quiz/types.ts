import type {
  TQuizQuestionField,
  TQuizQuestionType,
  TQuizScoringAlgorithm,
} from '@/shared/types/quiz';

export type IFormDataAnswer = {
  text: string;
  image: string | null;
  weight?: number | null;
  category?: string | null;
  loadedImg: string | null;
  isCorrect: boolean;
};

export type IFormDataQuestion = {
  containerId?: string;
  text: string;
  image: string | null;
  loadedImg: string | null;
  field: TQuizQuestionField;
  order: number;
  type: TQuizQuestionType;
  options: IFormDataAnswer[];
};

export type IFormDataResult = {
  from: number;
  to: number;
  text: string;
};

export interface IFormData {
  isEdit?: boolean;
  title: string;
  description: string;
  poster: string | null;
  timeLimit?: number;
  timeLimitChoice?: boolean;
  loadedImg: string | null;
  positiveScore: boolean;
  scoringAlgorithm: TQuizScoringAlgorithm;
  questions: IFormDataQuestion[];
  questionCategories?: { text: string }[];
  resultFeedbacks?: IFormDataResult[];
  feedbackNotice?: string;
}
