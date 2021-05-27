import { ICreateViewOptions, View } from '../view';

export class BtnView extends View<HTMLButtonElement> {
  public constructor({ classNames, ...options }: ICreateViewOptions) {
    super({
      ...options,
      tag: 'button',
      classNames: ['btn'].concat(classNames || []),
    });
  }

  public active(force = true): void {
    this.setCssState('btn--active', force);
  }
}
