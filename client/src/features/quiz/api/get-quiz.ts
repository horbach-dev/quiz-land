import { api } from "@/shared/api";
import type { TQuiz } from "@/features/quiz/types";

export const getQuiz = async (id: string): Promise<TQuiz> => {
  const response = await api.get(`/quiz/${id}`)
  return response?.data;
}
