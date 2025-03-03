import axios, { AxiosInstance } from 'axios';
import config from '../../../config';
import { StorageProviderInterface } from '@/types/storage/storageProvider.types';
import { CookieAccessProvider } from '../storage/CookieAccesProvider';
const api: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
});

const storageProvider: StorageProviderInterface = new CookieAccessProvider();

api.interceptors.request.use((config) => {
  const token = storageProvider.get('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
