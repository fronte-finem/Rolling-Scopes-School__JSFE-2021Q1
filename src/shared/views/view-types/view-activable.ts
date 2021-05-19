import { View, ICreateViewOptions, IView } from '../view';

export interface IViewActivable extends IView {
  active(force: boolean): void;
}

export interface ICreateViewActivableOptions extends ICreateViewOptions {
  activeStateClassName: string;
}

export abstract class ViewActivable extends View implements IViewActivable {
  constructor({
    statesClassNames,
    activeStateClassName,
    ...options
  }: ICreateViewActivableOptions) {
    super({
      statesClassNames: [...(statesClassNames || []), ['active', activeStateClassName]],
      ...options,
    });
  }

  active(force = true): void {
    this.setCssState('active', force);
  }
}
