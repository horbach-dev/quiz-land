import { api } from '@/shared/api';
import type { TQuiz } from '@/shared/types/quiz';

type TParams = {
  type: 'public' | 'my' | 'shared' | 'popular' | 'progress' | 'ended';
  limit?: number;
  pageParam?: number | unknown;
};

export const getQuizList = async ({ pageParam, limit, type }: TParams): Promise<TQuiz[]> => {
  const response = await api.get('/quiz', {
    params: { type, page: pageParam, limit: limit ?? 15 },
  });
  return response?.data;
};
