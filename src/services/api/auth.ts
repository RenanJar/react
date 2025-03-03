import { CookieAccessProvider } from '@/services/storage/CookieAccesProvider';
import api from './api';
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
  restaurante: string | null,
): Promise<LoginResponse> => {
  const request: LoginResquest = {
    restaurante: '123e4567-e89b-12d3-a456-426614174000',
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
