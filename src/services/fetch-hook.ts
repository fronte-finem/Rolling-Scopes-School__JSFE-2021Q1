import { useEffect, useState } from 'react';

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
        const maybeData = validator(await response.json());
        if (maybeData === null) throw new Error('Data not valid');
        setData(maybeData);
      } catch (maybeError) {
        if (typeof maybeError === 'string') setError(new Error(maybeError));
        else if (maybeError instanceof Error) setError(maybeError);
        else setError(new Error(String(maybeError)));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return [data, isLoading, error];
}
