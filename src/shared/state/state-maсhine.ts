import { IState, IContext } from './types';

export interface IStateChangeRequest<T> {
  from: T;
  to: T;
}

type StatesMap<T> = Map<T, IState<T>>;

export class StateMaсhine<T> {
  private readonly statesMap: StatesMap<T> = new Map() as StatesMap<T>;

  private currentState!: IState<T>;

  constructor(private readonly initialState: IState<T>) {
    this.currentState = initialState;
    this.addState(initialState);
  }

  addState(state: IState<T>): StateMaсhine<T> {
    this.statesMap.set(state.name, state);
    return this;
  }

  getCurrentState(): IState<T> {
    return this.currentState;
  }

  applyCurrentState(context: IContext<T>): void {
    this.currentState.apply(context);
  }

  nextState(context: IContext<T>, fireEvent = true): void {
    const oldState = this.currentState;
    const newState = this.statesMap.get(oldState.next) || this.initialState;
    this.currentState = newState;
    this.applyCurrentState(context);
    if (fireEvent) {
      context.observer.notify(oldState.name, [oldState.name, newState.name]);
    }
  }
}
