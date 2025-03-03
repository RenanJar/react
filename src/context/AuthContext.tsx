import { createContext, ReactNode, useEffect, useState } from 'react';
import { login as apiLogin, logout as apiLogout } from '@/api/auth';
import { CookieAccesProvider } from '@/service/CookieAccesProvider';
import { IstorageProvider } from '@/service/IstorageProvider';

interface AuthContextProps {
  restaurante: string | null;
  login: (email: string, password: string, restaurante: string | null) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

const storageProvider: IstorageProvider = new CookieAccesProvider();

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [restaurante, setRestaurante] = useState<AuthContextProps['restaurante']>(null);

  useEffect(() => {
    const token = storageProvider.get('token');
    if (token) {
      setRestaurante(null);
      ///aqui deve ser setado os dados do restaurante (nome status e afins) sera utilizado durante toda a app;
    }
  }, []);

  const login = async (email: string, password: string, restaurante: string) => {
    const data = await apiLogin(email, password, restaurante);
    storageProvider.save('token', data.accessToken);
    setRestaurante('dados Restaurante');
  };

  const logout = () => {
    apiLogout();
    storageProvider.remove('token');
    setRestaurante(null);
  };

  return (
    <AuthContext.Provider value={{ restaurante, login, logout }}>{children}</AuthContext.Provider>
  );
};
