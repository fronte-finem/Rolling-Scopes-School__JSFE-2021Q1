import { View } from '../../shared/views/view';
import { BasePage } from '../base-page';

export class PageError extends BasePage {
  public constructor() {
    super({ classNames: ['page-error'] });
  }

  public init(): void {
    this.view.render(new View({ tag: 'h1', text: PageError.name }));
  }

  public stop(): void {
    this.view.clear();
  }
}
