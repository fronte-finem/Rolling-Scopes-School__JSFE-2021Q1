import {
  createStep1,
  createStep2,
  createStep3,
  PAGE_ABOUT,
} from 'app/configs/page-about.config';
import { View } from 'shared/views/view';

import { BasePage } from '../base-page';

import styles from './about.scss';

export class PageAbout extends BasePage {
  public constructor() {
    super({ classNames: [styles.pageAbout] });
  }

  public async init(): Promise<void> {
    const title = new View(PAGE_ABOUT.title);
    const grid = new View({ classNames: [styles.grid] });
    grid.render([createStep1(), createStep2(), await createStep3()].flat());
    this.view.render([title, grid]);
  }

  public stop(): void {
    this.view.clear();
  }
}
// Todo:
// На странице About Game должна быть представлена краткая инструкция по началу игры

// На главной странице должна быть возможность зарегистрироваться как новый игрок.
