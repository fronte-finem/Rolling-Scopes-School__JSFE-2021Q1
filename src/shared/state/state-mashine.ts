import { StateName, IState, IContext } from './types';

type StatesMap<SpecificStateNames> = Map<
  StateName<SpecificStateNames>,
  IState<SpecificStateNames>
>;

export class StateMashine<SpecificStateNames> {
  private readonly statesMap: StatesMap<SpecificStateNames> =
    new Map() as StatesMap<SpecificStateNames>;

  private currentState!: IState<SpecificStateNames>;

  constructor(private readonly initialState: IState<SpecificStateNames>) {
    this.currentState = initialState;
    this.addState(initialState);
  }

  addState(
    state: IState<SpecificStateNames>
  ): StateMashine<SpecificStateNames> {
    this.statesMap.set(state.name, state);
    return this;
  }

  getCurrentState(): IState<SpecificStateNames> {
    return this.currentState;
  }

  applyCurrentState(context: IContext<SpecificStateNames>): void {
    this.currentState.apply(context);
  }

  nextState(context: IContext<SpecificStateNames>, fireEvent = true): void {
    const oldState = this.currentState;
    const newState = this.statesMap.get(oldState.next) || this.initialState;
    this.currentState = newState;
    this.applyCurrentState(context);
    if (fireEvent) {
      context.observer.notify(oldState.name, [oldState.name, newState.name]);
    }
  }
}
