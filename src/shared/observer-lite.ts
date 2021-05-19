export type Listener<T> = (data: T) => unknown;

export class ObserverLite {
  private readonly listeners = new Set<Listener<unknown>>();

  subscribe<T>(listener: Listener<T>): void {
    this.listeners.add(<Listener<unknown>>listener);
  }

  unsubscribe<T>(listener: Listener<T>): void {
    this.listeners.delete(<Listener<unknown>>listener);
  }

  notify<T>(data: T): void {
    this.listeners.forEach((listener) => listener(data));
  }
}
