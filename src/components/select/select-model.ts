import { Model } from '../../shared/models/model';

export interface ISelectOpionModelState<T> {
  value: T;
  text: string;
  selected?: boolean;
  disabled?: boolean;
  title?: string;
}

export type SelectModelState<T> = {
  [value: string]: ISelectOpionModelState<T>;
};

export class SelectModel<T extends string | number> extends Model<SelectModelState<T>> {
  constructor() {
    super({});
  }

  addOption(opt: ISelectOpionModelState<T>): void {
    this.state = this.proxify({ ...this.state, [opt.value]: opt });
  }

  addOptions(opts: ISelectOpionModelState<T>[]): void {
    const state = opts.reduce((acc, opt) => {
      acc[opt.value] = opt;
      return acc;
    }, {} as SelectModelState<T>);
    this.state = this.proxify({ ...this.state, ...state });
  }
}
