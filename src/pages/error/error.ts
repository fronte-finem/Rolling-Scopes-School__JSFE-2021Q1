import { BasePage } from '../base-page';

const PAGE_TITLE = 'error 404';

export class PageError extends BasePage {
  constructor() {
    super(PAGE_TITLE, { childs: [{ tag: 'h1', text: PAGE_TITLE }] });
  }
}
