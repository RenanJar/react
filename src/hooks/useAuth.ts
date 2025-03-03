import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth fora de um authProvider');
  }

  return context;
};
