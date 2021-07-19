import { LoginProps } from '@server/models/user';
import axios, { AxiosError } from 'axios';

import { BACKEND_API_URL } from 'services/rest-api/config';

export const AUTH_STORAGE_KEY = 'fronte-finem--efk--auth-token';

const API_URL = `${BACKEND_API_URL}/api/auth`;

export interface RestApiResponse<T> {
  data?: T;
  error?: string;
}

async function axiosWrapper<T>(axiosPromise: () => Promise<T>): Promise<RestApiResponse<T>> {
  try {
    return { data: await axiosPromise() };
  } catch (error) {
    console.log('AxiosError Error:', (error as AxiosError).response);
    return {
      error: (error as AxiosError).response?.data as string,
    };
  }
}

class AuthService {
  public login = async (loginProps: LoginProps): Promise<RestApiResponse<string>> => {
    return axiosWrapper(async () => {
      const { data } = await axios.post<string>(`${API_URL}/login`, loginProps);
      if (data) {
        localStorage.setItem(AUTH_STORAGE_KEY, data);
      }
      return data;
    });
  };

  public logout = (): void => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  public checkToken = async (): Promise<boolean> => {
    try {
      await axios.get(`${API_URL}/check-token`, { headers: authHeader() });
      return true;
    } catch (error) {
      console.log(error);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return false;
    }
  };

  public getCurrentToken = (): string | null => localStorage.getItem(AUTH_STORAGE_KEY);
}

export const authService = new AuthService();

interface AuthHeader {
  'x-access-token'?: string;
}

export function authHeader(): AuthHeader {
  const token = authService.getCurrentToken();
  return token ? { 'x-access-token': token } : {};
}
