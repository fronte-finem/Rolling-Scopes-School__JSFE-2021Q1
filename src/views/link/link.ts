import { ICreateElementOptions } from '../../shared/types';
import style from './link.scss';
import View from "../../shared/view";

export interface ICreateLinkOptions extends ICreateElementOptions {
  url: string;
}

export default class LinkView extends View {
  constructor({ url, styles, text }: ICreateLinkOptions) {
    super({
      tag: 'a',
      styles: [style.link].concat(styles),
      text
    });

    (<HTMLAnchorElement>this.element).href = url;
  }

  activate(): void {
    this.element.classList.add(style.linkActive);
  }

  deactivate(): void {
    this.element.classList.remove(style.linkActive);
  }
}
