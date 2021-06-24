import { useState, useEffect } from 'react';
import { Maybe, Validator } from 'types/abstract';

type FetchResult<T> = [data: Maybe<T>, isLoading: boolean, error: Maybe<Error>];

export function useFetch<T>(url: string, validator: Validator<T>): FetchResult<T> {
  const [data, setData] = useState<Maybe<T>>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Maybe<Error>>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
        const data = validator(await response.json());
        if (data === null) throw new Error('Data not valid');
        setData(data);
      } catch (error) {
        if (typeof error === 'string') setError(new Error(error));
        else if (error instanceof Error) setError(error);
        else setError(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return [data, isLoading, error];
}
