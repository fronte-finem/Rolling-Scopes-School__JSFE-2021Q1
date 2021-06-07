import { Listener, Observer } from './observer';

export type ModelState = Record<string, unknown>;

export interface ModelUpdateData<S extends ModelState> {
  oldState: S;
  newState: S;
}

enum ModelEvent {
  UPDATE,
}

export class Model<S extends ModelState> {
  protected readonly observer = new Observer<ModelEvent>();
  public readonly state: S;

  public constructor(initialState: S) {
    this.state = this.proxify(initialState);
  }

  public getState(): S {
    return { ...this.state };
  }

  public onUpdate(listener: Listener<S>): void {
    this.observer.addListener(ModelEvent.UPDATE, listener);
  }

  protected proxify(state: S): S {
    return new Proxy(state, {
      set: (target: S, p: string, value: unknown): boolean => {
        // const oldState = this.getState();
        (target as ModelState)[p] = value;
        const newState = this.getState();
        this.observer.notify(ModelEvent.UPDATE, newState);
        return true;
      },
    });
  }
}
