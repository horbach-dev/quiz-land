import type { TQuizQuestionType } from "@/features/quiz/types";

export type IFormDataAnswer = {
  text: string,
  image: string | null,
  isCorrect: boolean,
}

export type IFormDataQuestion = {
  text: string,
  image: string | null,
  order: number,
  type: TQuizQuestionType
  options: IFormDataAnswer[]
}

export interface IFormData {
  title: string
  description: string
  poster: string | null
  questions: IFormDataQuestion[]
  limitedByTime: boolean
}
