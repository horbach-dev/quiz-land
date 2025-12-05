import { api } from '@/shared/api';
import type { TQuiz } from '@/shared/types/quiz';

export const getQuizList = async (params): Promise<TQuiz[]> => {
  const response = await api.get('/quiz', {
    params,
  });
  return response?.data;
};
