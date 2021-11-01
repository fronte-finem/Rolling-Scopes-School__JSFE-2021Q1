import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { RestApiError, RestApiResponse } from 'services/rest-api/axios-response';
import { authHeader, AuthTokenStore } from 'services/rest-api/config';
import { getErrorMsg } from 'utils/error';

export interface CancelableRequest<T> {
  cancel: () => void;
  request: Promise<AxiosResponse<T>>;
}

export function axiosCancelWrapper<T>(config: AxiosRequestConfig): CancelableRequest<T> {
  const cancelSource = axios.CancelToken.source();
  return {
    cancel: () => cancelSource.cancel(`Request canceled!\n\n${JSON.stringify(config)}`),
    request: axios.request<T>({ ...config, cancelToken: cancelSource.token }),
  };
}

export async function axiosWrapper<T>(
  axiosPromise: Promise<AxiosResponse<T>>
): Promise<RestApiResponse<T>> {
  try {
    return { data: (await axiosPromise).data };
  } catch (error) {
    console.log('axiosWrapper Error:', error);
    const result: RestApiError = { isError: true, errorMessage: getErrorMsg(error) };
    if ((error as AxiosError).response) {
      result.isErrorResponse = true;
      const { status, data } = (error as AxiosError).response as AxiosResponse<string>;
      result.errorStatus = status;
      if (status === 401 || status === 403) {
        AuthTokenStore.delete();
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

export async function axiosAuth<T>(config: AxiosRequestConfig): Promise<RestApiResponse<T>> {
  return axiosWrapper(axios.request<T>({ ...config, headers: authHeader() }));
}
