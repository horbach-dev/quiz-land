import { api } from "@/shared/api";
import type { TQuizSession } from "@/features/quiz/types";

export const completeSession = async (sessionId: string): Promise<TQuizSession> => {
  const response = await api.post(`/quiz-session/complete/${sessionId}`)
  return response?.data;
}
