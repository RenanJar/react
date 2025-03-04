import { createContext, ReactNode, useEffect, useState } from 'react';
import { login as apiLogin, logout as apiLogout } from '@/services/api/auth';
import { StorageProviderInterface } from '@/types/storage/storageProvider.types';
import { CookieAccessProvider } from '@/services/storage/CookieAccesProvider';
import { useRouter } from 'next/router';
import { getRestaurante } from '@/services/api/restaurante.api';

interface AuthContextProps {
  restaurante: string;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, restaurante: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

const storageProvider: StorageProviderInterface = new CookieAccessProvider();

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [restaurante, setRestaurante] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const validateSession = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = storageProvider.get('token');
      console.log('token', token);
      if (!token) {
        if (!router.pathname.includes('/login')) {
          router.push('/login');
        }
        return;
      }

      const domain = window.location.hostname;
      const restauranteData = await buscarRestaurante(domain);
      setRestaurante(restauranteData);

      if (router.pathname === '/login') {
        router.push('/dashboard');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao validar sessão');
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    validateSession();
  }, []);

  const login = async (email: string, password: string, restaurante: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await apiLogin(email, password, restaurante);
      console.log('data', data);
      storageProvider.save('token', data.accessToken);
      storageProvider.save('refreshToken', data.refreshToken);

      const domain = window.location.hostname;
      const restauranteData = await buscarRestaurante(domain);
      setRestaurante(restauranteData);

      router.push('/dashboard', undefined, { shallow: false });
    } catch (error) {
      setError('Erro ao realizar login');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    apiLogout();
    storageProvider.remove('token');
    storageProvider.remove('refreshToken');
    setRestaurante('');
    setError(null);
    router.push('/login');
  };

  async function buscarRestaurante(restaurante: string): Promise<string> {
    const domain = restaurante;
    const restauranteData = await getRestaurante(domain);
    if (restauranteData && restauranteData.data) {
      return restauranteData.data;
    } else {
      throw new Error('Dados do restaurante não encontrados');
    }
  }

  return (
    <AuthContext.Provider value={{ restaurante, isLoading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
