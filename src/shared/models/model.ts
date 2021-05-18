import { Observer, Listener } from '../observer';
import { State } from '../types';

export abstract class Model<S extends State> {
  protected readonly observer = new Observer();

  protected readonly state: S;

  constructor(state: S) {
    this.state = this.proxify(state);
  }

  getState(): S {
    return { ...this.state };
  }

  protected stateChanged?: (state: S) => void;

  onStateChange(listener: Listener<S>): void {
    this.observer.subscribe('state-change', listener);
  }

  protected proxify(state: S): S {
    return new Proxy(state, {
      set: (target, prop: string, value: S[string]) => {
        const st = target;
        // Model.logChangeState(target, prop, value);
        (st[prop] as S[string]) = value;
        this.observer.notify('state-change', this.getState());
        this.observer.notify(prop, value);
        return true;
      },
    });
  }

  static logChangeState<T extends State>(
    target: T,
    prop: string,
    value: T[string]
  ): string {
    const msg = `Changin ${String(target)} property ${prop} from ${String(
      target[prop]
    )} to ${String(value)}`;
    // console.log(msg);
    return msg;
  }
}
