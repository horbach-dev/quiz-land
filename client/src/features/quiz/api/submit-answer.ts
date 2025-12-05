import { api } from '@/shared/api';
import type { TQuiz, TQuizAnswer } from '@/shared/types/quiz';

export const submitAnswer = async (answer: TQuizAnswer): Promise<TQuiz> => {
  const response = await api.post(`/quiz-session/submit-answer`, answer);
  return response?.data;
};
