import { Observer } from '../observer';

export type StateName<SpecificStateNames> = 'initial' | SpecificStateNames;

export interface IState<SpecificStateNames> {
  name: StateName<SpecificStateNames>;
  next: StateName<SpecificStateNames>;
  apply(context: IContext<SpecificStateNames>): void;
}

export interface IContext<SpecificStateNames> {
  observer: Observer<StateName<SpecificStateNames>>;
}
