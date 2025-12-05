import { api } from "@/shared/api";
import type { TQuizSession } from "@/shared/types/quiz";

export const completeSession = async (sessionId: string): Promise<TQuizSession> => {
  const response = await api.post(`/quiz-session/complete/${sessionId}`)
  return response?.data;
}
