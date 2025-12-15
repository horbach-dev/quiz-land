import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { buildUrl } from '@/shared/utils/buildUrl';

import { errorInterceptor, successInterceptor } from './interceptors';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: buildUrl('api'),
  responseType: 'json',
  headers: { 'Content-Type': 'application/json' },
};

export const setAuthHeader = (token: string) => {
  api.defaults.headers.common['Authorization'] = `tma ${token}`;
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

api.interceptors.response.use(successInterceptor, errorInterceptor);

export { api };
