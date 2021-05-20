import { IPageConfig } from '../../app/app.config';
import { Observer } from '../../shared/observer';
import { HeaderView } from './header-view';

export class Header {
  private readonly observer = new Observer();

  readonly view = new HeaderView();

  addNavLinks(options: IPageConfig[]): void {
    this.view.menu.addNavLinks(options);
  }

  setActiveNavLink(url: string): void {
    this.view.menu.setActiveNavLink(url);
  }
}

// После регистрации игрока в header должна появится кнопка позволяющая начать игру
// После нажатия на кнопку старт должен начинаться игровой цикл
// У игрока должна быть возможность остановить игру.
