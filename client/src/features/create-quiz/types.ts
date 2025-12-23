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
  order: number;
  text: string;
  image: string | null;
  loadedImg: string | null;
  field: TQuizQuestionField;
  type: TQuizQuestionType;
  options: IFormDataAnswer[];
};

export type IFormDataResult = {
  from?: number;
  to?: number;
  text: string;
  title?: string;
  category?: string;
  conditions?: {
    category: string;
    moreOrEqual: number | null;
    lessOrEqual: number | null;
  }[];
};

export interface IFormData {
  isEdit?: boolean;
  title: string;
  description: string;
  poster: string | null;
  timeLimit?: number;
  timeLimitChoice?: boolean;
  loadedImg: string | null;
  scoringAlgorithm: TQuizScoringAlgorithm;
  questions: IFormDataQuestion[];
  questionCategories?: { text: string; id: string }[];
  categoriesCounts?: Record<string, number>;
  results?: IFormDataResult[];
  resultNotice?: string;
  resultPositive: boolean;
  optionPopup: {
    isOpen: boolean;
    optionIndex: number;
    questionIndex: number;
  };
}
