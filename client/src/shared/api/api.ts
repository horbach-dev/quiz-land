import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { retrieveRawInitData } from '@tma.js/sdk'
import {
  errorInterceptor,
  successInterceptor,
} from './interceptors';
import { BASE_URL } from "@/constants";

const initDataRaw = retrieveRawInitData()

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: BASE_URL + 'api',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `tma ${initDataRaw}`
  }
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

api.interceptors.response.use(successInterceptor, errorInterceptor);

export { api };
