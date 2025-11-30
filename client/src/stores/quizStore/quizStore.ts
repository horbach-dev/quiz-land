import { create } from 'zustand';

export type TQuestionValue = { value: string, label: string, point: number };

export type TQuestion = {
  id: number;
  question: string;
  type: 'option' | 'select' | 'multi';
  options: TQuestionValue[]
  default?: TQuestionValue
}

export type TQuiz = {
  id: number;
  title: string,
  description: string,
  image: string,
  averageScore: number,
  results: number[],
  questions: TQuestion[],
}

interface IQuizState {
  currentQuiz: TQuiz | null;
  setCurrentQuiz: (quiz: TQuiz) => void;
}

export const useQuizStore = create<IQuizState>((set) => ({
  currentQuiz: null,
  setCurrentQuiz: (currentQuiz: TQuiz) => {
    set({ currentQuiz })
  }
}));
