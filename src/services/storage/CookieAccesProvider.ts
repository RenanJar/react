import { StorageProviderInterface } from '@/types/storage/storageProvider.types';
import Cookies from 'js-cookie';

export class CookieAccessProvider implements StorageProviderInterface {
  save(key: string, value: string): void {
    if (this.get(key)) return;
    Cookies.set(key, value);
  }

  get(key: string): string | undefined {
    return Cookies.get(key);
  }

  remove(key: string): void {
    Cookies.remove(key);
  }
}
