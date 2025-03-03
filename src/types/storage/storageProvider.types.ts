export interface StorageProviderInterface {
  save(key: string, value: string): void;
  get(key: string): string | undefined;
  remove(key: string): void;
}
