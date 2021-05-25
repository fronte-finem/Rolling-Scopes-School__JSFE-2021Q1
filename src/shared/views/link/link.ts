import { ICreateViewOptions, View } from '../view';

export interface ICreateLinkOptions extends ICreateViewOptions {
  url: string;
}

export class LinkView extends View<HTMLAnchorElement> {
  constructor({ url, classNames, ...options }: ICreateLinkOptions) {
    super({
      ...options,
      tag: 'a',
      classNames: ['link'].concat(classNames || []),
    });

    this.element.href = url;
  }

  active(force = true): void {
    this.setCssState('link--active', force);
  }
}
