import { View, ICreateViewOptions, IView } from '../view';

export interface IViewActivable extends IView {
  active(force: boolean): void;
}

export interface ICreateViewActivableOptions extends ICreateViewOptions {
  activeStyle: string;
}

export abstract class ViewActivable extends View implements IViewActivable {
  constructor({
    stateStyle,
    activeStyle,
    ...options
  }: ICreateViewActivableOptions) {
    super({
      stateStyle: [...(stateStyle || []), ['active', activeStyle]],
      ...options,
    });
  }

  active(force = true): void {
    this.setCssState('active', force);
  }
}
