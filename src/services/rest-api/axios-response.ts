export interface RestApiError {
  errorMessage?: string;
  errorStatus?: number;
  errorData?: string;
  isError?: boolean;
  isErrorToken?: boolean;
  isErrorRequest?: boolean;
  isErrorResponse?: boolean;
}

export interface RestApiResponse<T> extends RestApiError {
  data?: T;
}
