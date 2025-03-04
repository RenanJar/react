import { StorageProviderInterface } from '@/types/storage/storageProvider.types';
import Cookies from 'js-cookie';

export class CookieAccessProvider implements StorageProviderInterface {
  save(key: string, value: string): void {
    const isToken = key === 'token' || key === 'refreshToken';

    Cookies.set(key, value, {
      secure: true,
      sameSite: 'strict',
      expires: isToken ? 1 : 7, // tokens expiram em 1 dia, outros em 7
      path: '/',
    });
  }

  get(key: string): string | undefined {
    return Cookies.get(key);
  }

  remove(key: string): void {
    Cookies.remove(key);
  }
}
