import { api } from '@/shared/api';
import type { IFormData } from '../types';

export const createQuiz = async (data: IFormData) => {
  const response = await api.post('/quiz', data);
  return response?.data;
};
