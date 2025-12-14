import type { TQuizQuestionField, TQuizQuestionType } from '@/shared/types/quiz';

export type IFormDataAnswer = {
  text: string;
  image: string | null;
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
  time_limit: number;
  time_limit_choice: boolean;
  loadedImg: string | null;
  order: number;
  questions: IFormDataQuestion[];
  result_feedbacks: IFormDataResult[];
  limitedByTime: boolean;
}
