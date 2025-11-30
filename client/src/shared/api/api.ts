import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

import {
  errorInterceptor,
  successInterceptor,
} from './interceptors';
import { BASE_URL } from "@/constants";

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  }
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

api.interceptors.response.use(successInterceptor, errorInterceptor);

export { api };
