import { ICreateViewOptions } from '../view';
import { ViewActivable } from '../view-types/view-activable';

export interface ICreateLinkOptions extends ICreateViewOptions {
  url: string;
}

export class LinkView extends ViewActivable {
  constructor({ url, styles, ...options }: ICreateLinkOptions) {
    super({
      ...options,
      tag: 'a',
      styles: ['link'].concat(styles || []),
      activeStyle: 'link--active',
    });

    (<HTMLAnchorElement>this.element).href = url;
  }
}
