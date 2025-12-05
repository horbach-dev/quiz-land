import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { errorInterceptor, successInterceptor } from './interceptors';
import { BASE_URL } from '@/shared/constants';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: BASE_URL + 'api',
  responseType: 'json',
  headers: { 'Content-Type': 'application/json' },
};

export const setAuthHeader = (token: string) => {
  api.defaults.headers.common['Authorization'] = `tma ${token}`;
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

api.interceptors.response.use(successInterceptor, errorInterceptor);

export { api };
