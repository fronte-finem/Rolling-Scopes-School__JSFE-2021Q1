import { View } from '../../shared/views/view';
import { BasePage } from '../base-page';

export class PageError extends BasePage {
  constructor() {
    super({ classNames: ['page-error'] });
  }

  init(): void {
    this.view.render(new View({ tag: 'h1', text: PageError.name }));
  }

  stop(): void {
    this.view.clear();
  }
}
