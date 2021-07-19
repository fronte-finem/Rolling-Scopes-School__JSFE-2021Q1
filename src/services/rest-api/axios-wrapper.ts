import { AxiosError, AxiosResponse } from 'axios';

import { RestApiError, RestApiResponse } from 'services/rest-api/axios-response';
import { AUTH_STORAGE_KEY } from 'services/rest-api/config';
import { getErrorMsg } from 'utils/error';

export async function axiosWrapper<T>(axiosPromise: () => Promise<T>): Promise<RestApiResponse<T>> {
  try {
    return { data: await axiosPromise() };
  } catch (error) {
    console.log('axiosWrapper Error:', error);
    const result: RestApiError = { isError: true, errorMessage: getErrorMsg(error) };
    if ((error as AxiosError).response) {
      result.isErrorResponse = true;
      const { status, data } = (error as AxiosError).response as AxiosResponse<string>;
      result.errorStatus = status;
      if (status === 401 || status === 403) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        result.isErrorToken = true;
      }
      if (data) result.errorData = data;
    } else if ((error as AxiosError).request) {
      result.isErrorRequest = true;
      const { status } = (error as AxiosError).request as XMLHttpRequest;
      result.errorStatus = status;
    }
    return result;
  }
}
