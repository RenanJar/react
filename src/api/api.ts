import axios, { AxiosInstance } from 'axios';
import config from '../../config';
import { IstorageProvider } from '@/service/IstorageProvider';
import { CookieAccesProvider } from '@/service/CookieAccesProvider';

const api: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
});

const storageProvider: IstorageProvider = new CookieAccesProvider();

api.interceptors.request.use((config) => {
  const token = storageProvider.get('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
