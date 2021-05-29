import { AVATAR_CONTROL } from 'app/configs/avatar-control.config';
import { createSvgSpriteElement, cropResize } from 'shared/dom-utils';
import { ImgView } from 'shared/views/img/img';
import { View } from 'shared/views/view';

import styles from './avatar-control-view.scss';

export class AvatarControlView extends View {
  private input = new View<HTMLInputElement>(AVATAR_CONTROL.input);

  private output = new View(AVATAR_CONTROL.output);

  private imgBase64?: string;

  public constructor() {
    super({ classNames: [styles.avatar] });
    this.init();
  }

  public getAvatar(): string | undefined {
    return this.imgBase64;
  }

  private init(): void {
    const svg = createSvgSpriteElement(AVATAR_CONTROL.icons.output);
    this.output.element.append(svg);
    this.render([this.output, this.initInput()]);
  }

  private initInput(): View<HTMLElement> {
    const svg = createSvgSpriteElement(AVATAR_CONTROL.icons.input);
    const wrapper = new View(AVATAR_CONTROL.wrapper);
    wrapper.render(this.input);
    wrapper.element.append(svg);
    this.input.element.type = 'file';
    this.input.element.addEventListener('input', () => {
      void this.handleAddAvatar();
    });
    return wrapper;
  }

  private async handleAddAvatar(): Promise<void> {
    const fileList = this.input.element.files;
    if (!fileList) return;
    const file = fileList[0];
    let img = await ImgView.create({ url: window.URL.createObjectURL(file) });
    const imgBase64 = cropResize(img.element, 200);
    if (!imgBase64) return;
    this.imgBase64 = imgBase64;
    img = await ImgView.create({ url: imgBase64 });
    this.output.render(img);
  }
}
