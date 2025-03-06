import { CookieAccessProvider } from '@/services/storage/CookieAccesProvider';
import api from '../interceptors/interceptor';
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
  const origin = window.location.origin;
  const response = await api.post('auth/login', request, {
    headers: {
      Origin: origin,
    },
  });
  return response.data;
};

export const logout = () => {
  storageProvider.remove('accessToken');
};

export const refreshToken = async () => {
  const response = await api.post('/auth/refresh');
  return response.data.token;
};
