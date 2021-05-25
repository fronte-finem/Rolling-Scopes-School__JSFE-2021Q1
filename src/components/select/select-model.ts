import { Model } from '../../shared/models/model';

export interface ISelectOpionModelState {
  value: string;
  text: string;
  selected?: boolean;
  disabled?: boolean;
  title?: string;
}

export type SelectModelState = {
  [value: string]: ISelectOpionModelState;
};

export class SelectModel extends Model<SelectModelState> {
  constructor() {
    super({});
  }

  addOption(opt: ISelectOpionModelState): void {
    this.state = this.proxify({ ...this.state, [opt.value]: opt });
  }

  addOptions(opts: ISelectOpionModelState[]): void {
    const state = opts.reduce((acc, opt) => {
      acc[opt.value] = opt;
      return acc;
    }, {} as SelectModelState);
    this.state = this.proxify({ ...this.state, ...state });
  }
}
