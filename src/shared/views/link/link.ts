import { ICreateViewOptions } from '../view';
import { ViewActivable } from '../view-types/view-activable';

export interface ICreateLinkOptions extends ICreateViewOptions {
  url: string;
}

export class LinkView extends ViewActivable {
  constructor({ url, classNames, ...options }: ICreateLinkOptions) {
    super({
      ...options,
      tag: 'a',
      classNames: ['link'].concat(classNames || []),
      activeStateClassName: 'link--active',
    });

    (<HTMLAnchorElement>this.element).href = url;
  }
}
