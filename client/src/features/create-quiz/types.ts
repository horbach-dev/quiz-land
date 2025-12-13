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

export interface IFormData {
  isEdit?: boolean;
  title: string;
  description: string;
  poster: string | null;
  loadedImg: string | null;
  order: number;
  questions: IFormDataQuestion[];
  limitedByTime: boolean;
}
