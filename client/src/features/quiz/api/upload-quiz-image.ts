import { api } from "@/shared/api";
import type { AxiosProgressEvent } from "axios";

export const uploadQuizImage = async (formData: FormData, onProgress?: (v: number) => void) => {
  const response = await api.post('/files', formData, {
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      if (onProgress && progressEvent.total) {
        onProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
      }
    },
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response?.data;
}
