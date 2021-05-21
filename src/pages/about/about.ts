import { BasePage } from '../base-page';

export class PageAbout extends BasePage {
  constructor() {
    super({ childs: [{ tag: 'h1', text: PageAbout.name }] });
  }
}
// Todo:
// На странице About Game должна быть представлена краткая инструкция по началу игры

// На главной странице должна быть возможность зарегистрироваться как новый игрок.
