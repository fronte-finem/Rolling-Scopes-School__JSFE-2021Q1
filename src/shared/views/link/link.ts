import { ICreateViewOptions, View } from '../view';

export interface ICreateLinkOptions extends ICreateViewOptions {
  url: string;
}

export class LinkView extends View {
  constructor({ url, classNames, ...options }: ICreateLinkOptions) {
    super({
      ...options,
      tag: 'a',
      classNames: ['link'].concat(classNames || []),
    });

    (<HTMLAnchorElement>this.element).href = url;
  }

  active(force = true): void {
    this.setCssState('link--active', force);
  }
}
