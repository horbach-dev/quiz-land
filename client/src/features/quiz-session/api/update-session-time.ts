import { api } from '@/shared/api';

type TSessionTime = {
  sessionId: string;
  seconds: number;
};

export const updateSessionTime = async (data: TSessionTime): Promise<unknown> => {
  const response = await api.post(`/quiz-session/update-time`, data);
  return response?.data;
};
