export type Listener<T> = (data: T) => unknown;

export class ObserverLite {
  private readonly listeners = new Set<Listener<unknown>>();

  public subscribe<T>(listener: Listener<T>): void {
    this.listeners.add(listener as Listener<unknown>);
  }

  public unsubscribe<T>(listener: Listener<T>): void {
    this.listeners.delete(listener as Listener<unknown>);
  }

  public notify<T>(data: T): void {
    this.listeners.forEach((listener) => listener(data));
  }
}
