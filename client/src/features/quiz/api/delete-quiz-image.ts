import { api } from "@/shared/api";

export const deleteQuizImage = async (fileName: string) => {
  const response = await api.post('/files/delete', { fileName });
  return response?.data;
}
