import { api } from '@/shared/api';
import type { TQuiz } from '@/shared/types/quiz.ts';

import type { IFormData } from '../types';

export const createQuiz = async (data: IFormData): Promise<TQuiz> => {
  const response = await api.post('/quiz', data);
  return response?.data;
};
