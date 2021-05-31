import { PAGE_ABOUT } from 'app/configs/page-about.config';
import { View } from 'shared/views/view';

import { BasePage } from '../base-page';

import { createStep1 } from './step1';
import { createStep2 } from './step2';
import { createStep3 } from './step3';

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
