import { api } from '@/shared/api';
import type { TQuiz } from '@/shared/types/quiz';

import type { IFormData } from '../types';

export const updateQuiz = async (quizId: string, data: IFormData): Promise<TQuiz> => {
  const response = await api.patch(`/quiz/${quizId}`, data);
  return response?.data;
};
