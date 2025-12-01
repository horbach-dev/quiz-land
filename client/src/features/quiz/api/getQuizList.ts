import { api } from "@/shared/api";

export const getQuizList = async (params) => {
  const response = await api.get('/quiz', { params })
  return response?.data;
}
