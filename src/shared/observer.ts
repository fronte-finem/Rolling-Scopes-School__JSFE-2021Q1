export type Listener<T> = (data: T) => unknown;

type Listeners = Array<Listener<unknown>>;

export class Observer<EventEnum> {
  private readonly listenersMap = new Map<EventEnum, Listeners>();

  public addListener<T>(event: EventEnum, listener: Listener<T>): void {
    if (!this.listenersMap.has(event)) {
      this.listenersMap.set(event, []);
    }
    this.listenersMap.get(event)?.push(listener as Listener<unknown>);
  }

  public removeListener<T>(event: EventEnum, listener: Listener<T>): void {
    this.listenersMap.get(event)?.filter((x) => x !== listener);
  }

  public notify<T>(event: EventEnum, data: T): void {
    this.listenersMap.get(event)?.forEach((listener) => listener(data));
  }

  public reset(): void {
    this.listenersMap.forEach((listeners) => {
      listeners.length = 0;
    });
    this.listenersMap.clear();
  }
}
