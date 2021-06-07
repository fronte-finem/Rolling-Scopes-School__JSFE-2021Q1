type Listener<A, B> = (data: A) => Promise<B>;

type Listeners = Array<Listener<unknown, unknown>>;

export class AsyncObserver<EventEnum> {
  private readonly listenersMap = new Map<EventEnum, Listeners>();

  public addListener<A, B>(event: EventEnum, listener: Listener<A, B>): void {
    if (!this.listenersMap.has(event)) {
      this.listenersMap.set(event, []);
    }
    this.listenersMap.get(event)?.push(listener as Listener<unknown, unknown>);
  }

  public removeListener<A, B>(event: EventEnum, listener: Listener<A, B>): void {
    this.listenersMap.get(event)?.filter((x) => x !== listener);
  }

  public notify<A>(event: EventEnum, data: A): Promise<unknown>[] {
    return this.listenersMap.get(event)?.map((listener) => listener(data)) || [];
  }
}
