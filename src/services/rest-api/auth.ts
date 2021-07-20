import { LoginProps } from '@server/models/user';
import axios from 'axios';

import { RestApiResponse } from 'services/rest-api/axios-response';
import { axiosAuth, axiosWrapper } from 'services/rest-api/axios-wrapper';
import { AuthTokenStore, BACKEND_API_URL } from 'services/rest-api/config';

const API_URL = `${BACKEND_API_URL}/api/auth`;

class AuthService {
  public login = async (loginProps: LoginProps): Promise<RestApiResponse<string>> => {
    const response = await axiosWrapper(axios.post<string>(`${API_URL}/login`, loginProps));
    if (response.data) {
      AuthTokenStore.set(response.data);
    }
    return response;
  };

  public logout = (): void => {
    AuthTokenStore.delete();
  };

  public checkToken = async (): Promise<boolean> => {
    const result = await axiosAuth({ url: `${API_URL}/check-token`, method: 'GET' });
    if (result.isError) {
      console.log(result.errorData);
      AuthTokenStore.delete();
    }
    return !result.isError;
  };
}

export const authService = new AuthService();
