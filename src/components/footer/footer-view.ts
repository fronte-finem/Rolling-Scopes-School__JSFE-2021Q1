import { FOOTER, LogoOpts } from 'app/configs/footer.config';
import { createSvgSpriteElement } from 'shared/dom-utils';
import { LinkView } from 'shared/views/link/link';
import { View } from 'shared/views/view';

import styles from './footer-view.scss';

const createLogo = ({ link, text, svg }: LogoOpts) => {
  const logo = new LinkView(link);
  const span = new View(text);
  logo.element.append(createSvgSpriteElement(svg), span.element);
  return logo;
};

export class FooterView extends View {
  public constructor() {
    super({ tag: 'footer', classNames: [styles.footer] });
    this.init();
  }

  private init(): void {
    const wrapper = new View({ classNames: [styles.wrapper] });
    wrapper.render([
      createLogo(FOOTER.rss),
      createLogo(FOOTER.mentor),
      createLogo(FOOTER.student),
    ]);
    this.render(wrapper);
  }
}
