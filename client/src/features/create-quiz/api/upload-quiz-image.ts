import type { AxiosProgressEvent, GenericAbortSignal } from 'axios';

import { api } from '@/shared/api';

type TOptions = {
  signal?: GenericAbortSignal;
  onProgress?: (progress: number) => void;
};

export const uploadQuizImage = async (
  formData: FormData,
  { signal, onProgress }: TOptions,
) => {
  const response = await api.post('/files', formData, {
    signal,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      if (onProgress && progressEvent.total) {
        onProgress(
          Math.round((progressEvent.loaded * 100) / progressEvent.total),
        );
      }
    },
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response?.data;
};
