import { StorageProviderInterface } from '@/types/storage/storageProvider.types';
import Cookies from 'js-cookie';
import config from '../../../config';

export class CookieAccessProvider implements StorageProviderInterface {
  save(key: string, value: string): void {
    try {
      const options = {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        expires: 7,
        path: '/',
        domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined,
      };

      Cookies.set(key, value, options);

      // Verifica se salvou
      const saved = Cookies.get(key);
      console.log('Cookie salvo?', { key, saved });
    } catch (error) {
      console.error('Erro ao salvar cookie:', error);
    }
  }

  get(key: string): string | undefined {
    return Cookies.get(key);
  }

  remove(key: string): void {
    Cookies.remove(key, {
      domain: config.cookieDomain,
    });
  }
}
