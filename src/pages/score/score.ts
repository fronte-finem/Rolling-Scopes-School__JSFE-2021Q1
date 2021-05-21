import { BasePage } from '../base-page';

export class PageScore extends BasePage {
  constructor() {
    super({ childs: [{ tag: 'h1', text: PageScore.name }] });
  }
}

// На странице Best score должен отображаться топ 10 игроков.
