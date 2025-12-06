import { api } from '@/shared/api';
import type { TQuizSession } from '@/shared/types/quiz';

export type TResult = {
  session: TQuizSession;
  status: 'started' | 'resumed';
  nextQuestionId: string;
};

type TParams = {
  id: string;
  restart?: boolean;
};

export const startSession = async ({ id, restart }: TParams): Promise<TResult> => {
  const response = await api.post(`/quiz-session/start/${id}`, { restart });
  return response?.data;
};
