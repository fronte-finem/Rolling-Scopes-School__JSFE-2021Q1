import React from 'react';

type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>;

export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<T>] {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.log(`LocalStorage: Error getting key “${key}”:`, error);
      return initialValue;
    }
  });

  const setValue: Dispatch<T> = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
    } catch (error) {
      console.log(`LocalStorage: Error setting key “${key}”:`, error);
    }
  };

  return [storedValue, setValue];
}
