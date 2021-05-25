import { ICreateViewOptions, View } from '../view';

export class BtnView extends View<HTMLButtonElement> {
  constructor({ classNames, ...options }: ICreateViewOptions) {
    super({
      ...options,
      tag: 'button',
      classNames: ['btn'].concat(classNames || []),
    });
  }

  active(force = true): void {
    this.setCssState('btn--active', force);
  }
}
