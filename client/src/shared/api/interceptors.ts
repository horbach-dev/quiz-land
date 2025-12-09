import { type AxiosError, type AxiosResponse } from 'axios';

import type { DefaultResponse } from './types';

export interface ConsoleError {
  status: number;
  data: unknown;
}

export const successInterceptor = <T>(
  response: AxiosResponse<DefaultResponse<T>>,
): T => {
  if (response.data && response.data.success) {
    return response.data as T;
  }

  throw new Error(
    response.data?.message || 'Нестандартный успешный ответ сервера',
  );
};

export const errorInterceptor = async (
  error: AxiosError<DefaultResponse<unknown>>,
): Promise<void> => {
  if (error.response?.status === 401) {
    console.warn('Ошибка 401 Unauthorized');
    await Promise.reject(error);
  } else {
    if (error.response) {
      const message = error.response.data?.message || error.message;

      const errorMessage: ConsoleError = {
        status: error.response.status,
        data: error.response.data, // Здесь полный объект ошибки бэкенда
      };

      console.error('API Error:', errorMessage);
      await Promise.reject(new Error(message));
    } else if (error.request) {
      console.error('Network Error:', error.request);
      await Promise.reject(new Error('Ошибка сети или сервер недоступен'));
    } else {
      // Другие ошибки
      console.error('Error', error.message);
      await Promise.reject(error);
    }
  }
};
