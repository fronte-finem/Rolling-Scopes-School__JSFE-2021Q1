import { BasePage } from '../base-page';

export class PageError extends BasePage {
  constructor() {
    super({ childs: [{ tag: 'h1', text: PageError.name }] });
  }
}
