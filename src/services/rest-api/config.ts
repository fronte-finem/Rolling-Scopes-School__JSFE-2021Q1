import { CategoryClass } from '@server/models/category';
import { WordClass } from '@server/models/word';

export type CategoryDocument = CategoryClass & { _id: string };
export type WordDocument = WordClass & { _id: string };

declare const BACKEND_API: string;
const BACKEND_API_URL: string = BACKEND_API;
export { BACKEND_API_URL };

const AUTH_STORAGE_KEY = 'fronte-finem--efk--auth-token';

export class AuthTokenStore {
  public static get(): string | null {
    return localStorage.getItem(AUTH_STORAGE_KEY);
  }

  public static set(token: string): void {
    localStorage.setItem(AUTH_STORAGE_KEY, token);
  }

  public static delete(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

interface AuthHeader {
  'x-access-token'?: string;
}

export function authHeader(): AuthHeader {
  const token = AuthTokenStore.get();
  return token ? { 'x-access-token': token } : {};
}
