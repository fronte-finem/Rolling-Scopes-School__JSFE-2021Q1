export type Listener<T> = (data: T) => void;

type Listeners = Set<Listener<unknown>>;

export default class Observer<E> {
  private readonly listenersMap = new Map<E, Listeners>();

  subscribe<T>(event: E, listener: Listener<T>): void {
    if (!this.listenersMap.has(event)) {
      this.listenersMap.set(event, new Set());
    }
    this.listenersMap.get(event)?.add(<Listener<unknown>>listener);
  }

  unsubscribe<T>(event: E, listener: Listener<T>): void {
    this.listenersMap.get(event)?.delete(<Listener<unknown>>listener);
  }

  notify<T>(event: E, data: T): void {
    this.listenersMap.get(event)?.forEach((listener) => listener(data));
  }
}
