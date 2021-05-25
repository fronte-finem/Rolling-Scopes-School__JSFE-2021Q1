import { ICreateLinkOptions } from '../link/link';
import { View } from '../view';

export interface ICreateImgOptions extends ICreateLinkOptions {
  alt?: string;
}

export class ImgView extends View<HTMLImageElement> {
  constructor({
    url,
    alt = 'image',
    classNames,
    ...options
  }: ICreateImgOptions) {
    super({
      ...options,
      tag: 'img',
      classNames: ['img'].concat(classNames || []),
    });

    this.element.src = url;
    this.element.alt = alt;
    this.element.setAttribute('crossOrigin', 'anonymous');
  }

  static create(options: ICreateImgOptions): Promise<ImgView> {
    return new Promise((resolve) => {
      const img = new ImgView(options);
      img.element.addEventListener('load', () => resolve(img));
    });
  }
}
