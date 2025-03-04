import { CookieAccessProvider } from '@/services/storage/CookieAccesProvider';
import api from './interceptor';
import { StorageProviderInterface } from '@/types/storage/storageProvider.types';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface LoginResquest {
  email: string;
  senha: string;
  restaurante: string;
}

const storageProvider: StorageProviderInterface = new CookieAccessProvider();

export const login = async (
  email: string,
  password: string,
  restaurante: string,
): Promise<LoginResponse> => {
  const request: LoginResquest = {
    restaurante: restaurante,
    email: email,
    senha: password,
  };
  const response = await api.post('auth/login', request);
  return response.data;
};

export const logout = () => {
  storageProvider.remove('accessToken');
};

export const refreshToken = async () => {
  const response = await api.post('/auth/refresh');
  storageProvider.save('refreshToken', response.data.refreshToken);
  return response.data.token;
};
