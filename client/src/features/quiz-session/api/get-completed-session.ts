import { api } from '@/shared/api';
import type { TSessionCompleted } from '@/shared/types/quiz';

export const getCompletedSession = async (
  sessionId: string,
): Promise<TSessionCompleted> => {
  const response = await api.get(`/quiz-session/completed/${sessionId}`);
  return response?.data;
};
