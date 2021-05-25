import { Observer } from '../observer';

export interface IState<T> {
  name: T;
  next: T;
  apply(context: IContext<T>): void;
}

export interface IContext<T> {
  observer: Observer<T>;
}
