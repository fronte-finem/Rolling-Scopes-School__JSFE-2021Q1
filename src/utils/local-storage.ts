export function save<T>(key: string, data: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(`LocalStorage: Error setting key “${key}”:`, error);
  }
}

export function load<T>(key: string, initialData: T): T {
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialData;
  } catch (error) {
    console.log(`LocalStorage: Error getting key “${key}”:`, error);
    return initialData;
  }
}
