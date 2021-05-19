import { ICreateViewOptions } from '../view';
import { ViewActivable } from '../view-types/view-activable';

export class BtnView extends ViewActivable {
  constructor({ classNames, ...options }: ICreateViewOptions) {
    super({
      ...options,
      tag: 'button',
      classNames: ['btn'].concat(classNames || []),
      activeStateClassName: 'btn--active',
    });
  }
}
