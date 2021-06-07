import { Maybe, Try } from 'shared/types';

import { HEADER_JSON, Method, SERVER } from './api-config';
import { AbortError, EngineError, FetchError, ParseJsonError, ResponseError } from './errors';

type QueryParams = Record<string, string | number>;

function generateQuery(queryParams: QueryParams): string {
  return Object.entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}

export function generateUrl(path: string, queryParams: QueryParams = {}): string {
  return `${SERVER}${path}?${generateQuery(queryParams)}`;
}

export function generateRequest<T>(
  method = Method.GET,
  data?: T,
  signal?: AbortSignal
): RequestInit {
  const init: RequestInit = { method };
  if (data) {
    init.body = JSON.stringify(data);
    init.headers = HEADER_JSON;
  }
  if (signal) {
    init.signal = signal;
  }
  return init;
}

export const initGet = (signal?: AbortSignal): RequestInit =>
  generateRequest(Method.GET, undefined, signal);
export const initPOST = (data: unknown, signal?: AbortSignal): RequestInit =>
  generateRequest(Method.POST, data, signal);
export const initPUT = (data: unknown, signal?: AbortSignal): RequestInit =>
  generateRequest(Method.PUT, data, signal);
export const initDELETE = (signal?: AbortSignal): RequestInit =>
  generateRequest(Method.DELETE, undefined, signal);

export type StatusHandler = (response: Response) => Maybe<Error>;

export const getStatusHandler =
  (ok = 200) =>
  (response: Response): Maybe<Error> => {
    if (response.status === ok) return null;
    switch (response.status) {
      case 500:
        return new EngineError(response);
      default:
        return new ResponseError(response);
    }
  };

interface ISafeFetchOptions {
  statusHandler?: StatusHandler;
  url: RequestInfo;
  init?: RequestInit;
}

type Validator<Result> = (maybeData: unknown) => Result;

interface IFetchOptions<Result> extends ISafeFetchOptions {
  validator: Validator<Result>;
}

// https://developer.mozilla.org/en-US/docs/Web/API/AbortController
// Note: When abort() is called, the fetch() promise rejects with a DOMException named AbortError.

export async function safeFetch({
  statusHandler = getStatusHandler(),
  url,
  init = initGet(),
}: ISafeFetchOptions): Promise<Try<Response>> {
  let response: Response;
  try {
    response = await fetch(url, init);
  } catch (error) {
    if (!(error instanceof Error)) return null;
    if (error instanceof DOMException && error.name === 'AbortError') return new AbortError();
    return new FetchError(error.message);
  }
  const maybeError = statusHandler(response);
  return maybeError || response;
}

export async function safeResponseHandler<Result>(
  response: Response,
  validator: Validator<Result>
): Promise<Try<Result>> {
  let maybeData: unknown;
  try {
    maybeData = (await response.json()) as unknown;
  } catch (error) {
    if (!(error instanceof Error)) return null;
    return new ParseJsonError(error.message);
  }
  return validator(maybeData);
}

export async function fetcher<Result>({
  validator,
  ...options
}: IFetchOptions<Result>): Promise<Try<Result>> {
  const maybeError = await safeFetch(options);
  if (!(maybeError instanceof Response)) return maybeError;
  return safeResponseHandler(maybeError, validator);
}
