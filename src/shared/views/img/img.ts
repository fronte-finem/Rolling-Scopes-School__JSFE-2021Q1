import { ICreateLinkOptions } from '../link/link';
import { View } from '../view';

export class ImgView extends View {
  constructor({ url, styles, ...options }: ICreateLinkOptions) {
    super({
      ...options,
      tag: 'img',
      styles: ['img'].concat(styles || []),
    });

    (<HTMLImageElement>this.element).src = url;
  }
}
