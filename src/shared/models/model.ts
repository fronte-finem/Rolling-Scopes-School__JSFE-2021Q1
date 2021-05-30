// import { logChangeState } from '../object-utils';
import { Listener, Observer } from '../observer';

export type ModelState = Record<string, unknown>;

export abstract class Model<S extends ModelState> {
  protected readonly observer = new Observer();

  public state: S = {} as S;

  public constructor(state?: S) {
    if (state) this.init(state);
  }

  public init(state: S): void {
    this.state = this.proxify(state);
  }

  public getState(): S {
    return { ...this.state };
  }

  public onStateChange(listener: Listener<S>): void {
    this.observer.subscribe('state-change', listener);
  }

  protected proxify(state: S): S {
    return new Proxy(state, {
      set: (target, prop: string, value: S[string]) => {
        const st = target;
        // logChangeState(target, prop, value);
        (st[prop] as S[string]) = value;
        this.observer.notify('state-change', this.getState());
        this.observer.notify(prop, value);
        return true;
      },
    });
  }
}
