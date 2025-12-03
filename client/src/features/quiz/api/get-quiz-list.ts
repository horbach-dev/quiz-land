import { api } from "@/shared/api";
import type { TQuiz } from "@/features/quiz/types";

export const getQuizList = async (params): Promise<TQuiz[]> => {
  const response = await api.get('/quiz', {
    params
  })
  return response?.data;
}
