import { User } from '@server/stores/auth';
import axios from 'axios';

type UserRes = User & {
  accessToken?: string;
};

export const AUTH_STORAGE_KEY = 'fronte-finem--efk--auth-token';

const API_URL = 'http://localhost:5000/api/auth';

class AuthService {
  public login = async (user: User): Promise<UserRes> => {
    const response = await axios.post<UserRes>(`${API_URL}/login`, user);

    if (response.data.accessToken) {
      localStorage.setItem(AUTH_STORAGE_KEY, response.data.accessToken);
    }

    return response.data;
  };

  public logout = async (): Promise<void> => {
    await axios.get(`${API_URL}/logout`, { headers: authHeader() });
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
