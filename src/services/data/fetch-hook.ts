import { useEffect, useReducer } from 'react';

import { Maybe, Validator } from 'types/abstract';

export enum FetchStatus {
  INIT = 'init',
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
}

export interface FetchState<T> {
  status: FetchStatus;
  error: string;
  data: Maybe<T>;
}

function getInitState<T>(): FetchState<T> {
  return {
    status: FetchStatus.INIT,
    error: '',
    data: null as Maybe<T>,
  };
}

enum ActionType {
  REQUEST = 'request',
  FAILURE = 'failure',
  SUCCESS = 'success',
}

type Action<T> =
  | { type: ActionType.REQUEST }
  | { type: ActionType.SUCCESS; payload: T }
  | { type: ActionType.FAILURE; payload: string };

function fetchReducer<T>(state: FetchState<T>, action: Action<T>): FetchState<T> {
  switch (action.type) {
    case ActionType.REQUEST:
      return { ...getInitState(), status: FetchStatus.LOADING };
    case ActionType.SUCCESS:
      return { ...getInitState(), status: FetchStatus.SUCCESS, data: action.payload };
    case ActionType.FAILURE:
      return { ...getInitState(), status: FetchStatus.ERROR, error: action.payload };
    default:
      return state;
  }
}

export function useFetch<T = unknown>(url: string, validator: Validator<T>): FetchState<T> {
  const [state, dispatch] = useReducer(fetchReducer, getInitState<T>());

  useEffect(() => {
    (async () => {
      dispatch({ type: ActionType.REQUEST });
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
        const maybeData = validator(await response.json());
        if (maybeData === null) throw new Error('Data not valid');
        dispatch({ type: ActionType.SUCCESS, payload: maybeData });
      } catch (error) {
        dispatch({
          type: ActionType.FAILURE,
          payload: error instanceof Error ? error.message : String(error),
        });
      }
    })();
  }, []);

  return state as FetchState<T>;
}

export function getMessage<T>(state: FetchState<T>, dataName: string): string | null {
  switch (state.status) {
    case FetchStatus.INIT:
      return `Init Loading ${dataName}`;
    case FetchStatus.LOADING:
      return `Loading ${dataName}...`;
    case FetchStatus.ERROR:
      return `{dataName} Load Error: ${state.error}`;
    default:
      return null;
  }
}
