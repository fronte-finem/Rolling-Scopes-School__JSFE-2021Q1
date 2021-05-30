import { PAGE_ABOUT } from 'app/configs/page-about.config';
import { zipWith } from 'shared/array-utils';
import { ImgView } from 'shared/views/img/img';
import { View } from 'shared/views/view';

import { BasePage } from '../base-page';

import styles from './about.scss';

const createInfo = (text: string) => {
  const info = new View({ classNames: [styles.info, styles.cell] });
  const textView = new View({ classNames: [styles.text], text });
  info.render(textView);
  return info;
};

const createPict = (url: string) => {
  const pict = new View({ classNames: [styles.pict, styles.cell] });
  const img = new ImgView({ url, classNames: [styles.img] });
  pict.render(img);
  return pict;
};

export class PageAbout extends BasePage {
  public constructor() {
    super({ classNames: [styles.pageAbout] });
  }

  public init(): void {
    const title = new View({
      tag: 'h2',
      classNames: [styles.title],
      text: PAGE_ABOUT.title,
    });
    const grid = new View({ classNames: [styles.grid] });
    grid.render(
      zipWith(
        (text, url) => [createInfo(text), createPict(url)],
        PAGE_ABOUT.texts,
        PAGE_ABOUT.urls
      ).flat()
    );
    this.view.render([title, grid]);
  }

  public stop(): void {
    this.view.clear();
  }
}
// Todo:
// На странице About Game должна быть представлена краткая инструкция по началу игры

// На главной странице должна быть возможность зарегистрироваться как новый игрок.
