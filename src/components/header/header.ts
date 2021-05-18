import Observer from '../../shared/observer';
import { NavLinkCreateOptions } from '../nav-menu/nav-menu-view';
import HeaderView from './header-view';

export default class Header {
  private readonly observer = new Observer();

  readonly view = new HeaderView();

  addNavLinks(options: NavLinkCreateOptions[]): void {
    this.view.menu.addNavLinks(options)
  }

  setActiveNavLink(url: string): void {
    this.view.menu.setActiveNavLink(url);
  }
}

// После регистрации игрока в header должна появится кнопка позволяющая начать игру
// После нажатия на кнопку старт должен начинаться игровой цикл
// У игрока должна быть возможность остановить игру.
