import { View } from '../../shared/views/view';
import { BasePage } from '../base-page';

export class PageAbout extends BasePage {
  public constructor() {
    super({ classNames: ['page-about'] });
  }

  public init(): void {
    this.view.render(new View({ tag: 'h1', text: PageAbout.name }));
  }

  public stop(): void {
    this.view.clear();
  }
}
// Todo:
// На странице About Game должна быть представлена краткая инструкция по началу игры

// На главной странице должна быть возможность зарегистрироваться как новый игрок.
