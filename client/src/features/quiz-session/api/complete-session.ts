import { api } from '@/shared/api';
import type { TSessionCompleted } from '@/shared/types/quiz';

export const completeSession = async (sessionId: string): Promise<TSessionCompleted> => {
  const response = await api.post(`/quiz-session/complete/${sessionId}`);
  return response?.data;
};
