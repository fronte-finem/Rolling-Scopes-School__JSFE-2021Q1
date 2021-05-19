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

  getCurrentState(): StateName<SpecificStateNames> {
    return this.currentState.name;
  }

  applyCurrentState(
    context: IContext<SpecificStateNames>,
    fireEvent = true
  ): void {
    const currentStateName = this.currentState.name;
    this.currentState.apply(context);
    this.currentState =
      this.statesMap.get(this.currentState.next) || this.initialState;
    if (fireEvent) {
      context.observer.notify(currentStateName, currentStateName);
    }
  }
}
