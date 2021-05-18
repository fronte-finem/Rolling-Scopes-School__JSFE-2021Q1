import BasePage from '../base-page';

const PAGE_TITLE = 'game settings';

export default class PageSettings extends BasePage {
  constructor() {
    super(PAGE_TITLE, { childs: [{ tag: 'h1', text: PAGE_TITLE }]});
  }
}

// На странице Settings должны находится настройки приложения. Допускаются любые настройки, но две базовые нельзя игнорировать:
//   Настройка сложности игры (4х4, 6х6, 8х8)
//   Настройка типов карточек для сравнений (можно использовать любые типы. Пример: Животные, автомобили и т.п.)
