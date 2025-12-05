import { api } from "@/shared/api";
import type { TQuizSession } from "@/features/quiz/types";

type TResult = {
  session: TQuizSession,
  status: 'started' | 'resumed',
  nextQuestionId: string,
}

export const getSession = async (id: string): Promise<TResult> => {
  const response = await api.post(`/quiz-session/start/${id}`)
  return response?.data;
}
