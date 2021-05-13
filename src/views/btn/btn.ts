import style from './btn.scss';
import { ICreateElementOptions } from '../../shared/types';
import View from "../../shared/view";

export default class BtnView extends View {
  constructor({ styles, text }: ICreateElementOptions) {
    super({
      tag: 'button',
      styles: [style.btn].concat(styles),
      text
    });
  }

  activate(): void {
    this.element.classList.add(style.btnActive);
  }

  deactivate(): void {
    this.element.classList.remove(style.btnActive);
  }
}
