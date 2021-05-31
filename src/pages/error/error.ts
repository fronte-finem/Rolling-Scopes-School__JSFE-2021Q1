import { PAGE_ERROR } from 'app/configs/page-error.config';

import { CardView } from '~components/card/card-view';

import { View } from '../../shared/views/view';
import { BasePage } from '../base-page';

import styles from './error.scss';

export class PageError extends BasePage {
  private cardModel = PAGE_ERROR.card;

  private cardView = new CardView(this.cardModel);

  public constructor() {
    super({ classNames: [styles.pageError] });
  }

  public stop(): void {
    this.view.clear();
  }

  public init(url = '#/unknown'): void {
    const title = new View(PAGE_ERROR.title);
    title.setText(PAGE_ERROR.title.getMessage(url.slice(2)));
    const wrapper = new View({ classNames: [styles.wrapper] });
    wrapper.render(this.cardView);
    this.view.render([title, wrapper]);
    this.initCard();
  }

  private initCard(): void {
    this.cardView.onClick(async () => {
      const toggle = !this.cardModel.getState().isFrontSide;
      this.cardModel.flip(toggle);
      await this.cardView.flip(toggle);
    });
  }
}
