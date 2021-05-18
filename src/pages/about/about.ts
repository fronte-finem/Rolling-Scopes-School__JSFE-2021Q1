import BasePage from '../base-page';

const PAGE_TITLE = 'about game';

export default class PageAbout extends BasePage {
  constructor() {
    super(PAGE_TITLE, { childs: [{ tag: 'h1', text: PAGE_TITLE }]});
  }
}
// Todo:
// На странице About Game должна быть представлена краткая инструкция по началу игры

// На главной странице должна быть возможность зарегистрироваться как новый игрок.
