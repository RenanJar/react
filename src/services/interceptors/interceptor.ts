import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { CookieAccessProvider } from '../storage/CookieAccesProvider';
import config from '../../../config';

const api: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
});

const storageProvider = new CookieAccessProvider();

// Adiciona logs para debug
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = storageProvider.get('accessToken');
    console.log('Token encontrado:', token); // Debug

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Headers configurados:', config.headers); // Debug
    } else {
      console.log('Nenhum token encontrado nos cookies'); // Debug
    }

    return config;
  },
  (error) => {
    console.error('Erro no interceptor:', error); // Debug
    return Promise.reject(error);
  },
);

// Adiciona interceptor de resposta para debug
api.interceptors.response.use(
  (response) => {
    console.log('Resposta da API:', {
      url: response.config.url,
      status: response.status,
      headers: response.config.headers,
    });
    return response;
  },
  (error) => {
    console.error('Erro na resposta:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
    });
    return Promise.reject(error);
  },
);

export default api;
