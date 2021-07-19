import { LoginProps } from '@server/models/user';
import axios from 'axios';

import { RestApiResponse } from 'services/rest-api/axios-response';
import { axiosWrapper } from 'services/rest-api/axios-wrapper';
import { AUTH_STORAGE_KEY, BACKEND_API_URL } from 'services/rest-api/config';

const API_URL = `${BACKEND_API_URL}/api/auth`;

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
