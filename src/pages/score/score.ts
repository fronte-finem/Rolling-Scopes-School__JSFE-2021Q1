import { BasePage } from '../base-page';

const PAGE_TITLE = 'best score';

export class PageScore extends BasePage {
  constructor() {
    super(PAGE_TITLE, { childs: [{ tag: 'h1', text: PAGE_TITLE }] });
  }
}

// На странице Best score должен отображаться топ 10 игроков.
