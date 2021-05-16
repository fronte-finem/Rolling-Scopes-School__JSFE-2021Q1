import { ICreateViewOptions } from '../view';
import ViewActivable from '../view-types/view-activable';

export default class BtnView extends ViewActivable {
  constructor({ styles, ...options }: ICreateViewOptions) {
    super({
      ...options,
      tag: 'button',
      styles: ['btn'].concat(styles || []),
      activeStyle: 'btn--active'
    });
  }
}
