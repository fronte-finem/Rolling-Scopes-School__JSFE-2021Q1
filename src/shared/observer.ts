export interface IEvent<T> {
  data: T;
}

type EventType<T> = { new (data: T): IEvent<T> };

export type IListener<T> = (event: IEvent<T>) => void;

type Listeners<T> = Set<IListener<T>>;

type ListenersMap<T> = Map<EventType<T>, Listeners<T>>;

export default class Observer<T> {
  private readonly listenersMap: ListenersMap<T> = new Map();

  subscribe(eventType: EventType<T>, listener: IListener<T>): void {
    if (!this.listenersMap.has(eventType)) {
      this.listenersMap.set(eventType, new Set());
    }
    this.listenersMap.get(eventType)?.add(listener);
  }

  unsubscribe(eventType: EventType<T>, listener: IListener<T>): void {
    this.listenersMap.get(eventType)?.delete(listener);
  }

  notify(event: IEvent<T>): void {
    const eventType = <EventType<T>>event.constructor;
    this.listenersMap.get(eventType)?.forEach((listener) => listener(event));
  }
}
