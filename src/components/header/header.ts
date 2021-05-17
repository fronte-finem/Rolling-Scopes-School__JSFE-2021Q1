import Observer from '../../shared/observer';
import HeaderView from './header-view';

export default class Header {
  private readonly observer = new Observer();

  readonly view: HeaderView;

  constructor(navData: { url: string; text: string }[]) {
    this.view = new HeaderView(navData);
  }

  setActiveNavLink(url: string): void {
    this.view.setActiveNavLink(url);
  }
}

// После регистрации игрока в header должна появится кнопка позволяющая начать игру
// После нажатия на кнопку старт должен начинаться игровой цикл
// У игрока должна быть возможность остановить игру.
