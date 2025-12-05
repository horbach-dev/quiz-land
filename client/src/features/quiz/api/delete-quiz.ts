import { api } from '@/shared/api';

export const deleteQuiz = async (id: string): Promise<boolean> => {
  const response = await api.delete(`/quiz/${id}`);
  return response?.data;
};
