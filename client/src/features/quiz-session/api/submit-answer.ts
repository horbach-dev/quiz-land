import { api } from "@/shared/api";
import type { TQuizAnswer } from "@/shared/types/quiz";

export const submitAnswer = async (answer: Omit<TQuizAnswer, 'id'>): Promise<unknown> => {
  const response = await api.post(`/quiz-session/submit-answer`, answer)
  return response?.data;
}
