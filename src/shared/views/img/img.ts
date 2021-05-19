import { ICreateLinkOptions } from '../link/link';
import { View } from '../view';

export class ImgView extends View {
  constructor({ url, classNames, ...options }: ICreateLinkOptions) {
    super({
      ...options,
      tag: 'img',
      classNames: ['img'].concat(classNames || []),
    });

    (<HTMLImageElement>this.element).src = url;
  }
}
