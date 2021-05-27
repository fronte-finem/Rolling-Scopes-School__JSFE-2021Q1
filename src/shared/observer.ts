export type Listener<T> = (data: T) => unknown;

type Listeners = Set<Listener<unknown>>;

export class Observer<E> {
  private readonly listenersMap = new Map<E, Listeners>();

  public subscribe<T>(event: E, listener: Listener<T>): void {
    if (!this.listenersMap.has(event)) {
      this.listenersMap.set(event, new Set());
    }
    this.listenersMap.get(event)?.add(<Listener<unknown>>listener);
  }

  public unsubscribe<T>(event: E, listener: Listener<T>): void {
    this.listenersMap.get(event)?.delete(<Listener<unknown>>listener);
  }

  public notify<T>(event: E, data: T): void {
    this.listenersMap.get(event)?.forEach((listener) => listener(data));
  }
}
