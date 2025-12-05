import { api } from "@/shared/api";
import type { TQuiz } from "@/shared/types/quiz";

export const getQuiz = async (id: string): Promise<TQuiz> => {
  const response = await api.get(`/quiz/${id}`)
  return response?.data;
}
