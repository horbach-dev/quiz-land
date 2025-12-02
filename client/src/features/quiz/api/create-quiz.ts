import { api } from "@/shared/api";

export const createQuiz = async (data) => {
  const response = await api.post('/quiz', data)
  return response?.data;
}
