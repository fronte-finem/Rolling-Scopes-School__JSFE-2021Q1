import { State } from "./types";

export type Listener<S extends State> = (state: S) => void;

export class ObserverLite<S extends State> {
  private readonly listeners = new Set<Listener<S>>();

  subscribe(listener: Listener<S>): void {
    this.listeners.add(listener);
  }

  unsubscribe(listener: Listener<S>): void {
    this.listeners.delete(listener);
  }

  notify(state: S): void {
    this.listeners.forEach((listener) => listener(state));
  }
}
