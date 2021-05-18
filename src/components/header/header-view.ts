import appConfig from '../../app/app.config';
import Observer from '../../shared/observer';
import BtnView from '../../shared/views/btn/btn';
import LinkView from '../../shared/views/link/link';
import View from '../../shared/views/view';
import Factory from '../../shared/views/view-factory';
import HeaderState from './state/base-state';
import HeaderStateInitial from './state/state-initial';
import style from './header-view.scss';

export type HeaderViewEvent = 'initial' | 'sign-in' | 'start' | 'stop';

export default class HeaderView extends View {
  readonly observer = new Observer<HeaderViewEvent>();

  private state = new HeaderStateInitial(this);

  private navLinks?: Map<string, LinkView>;

  private activeNavLink: LinkView | undefined;

  readonly logo = new LinkView({ url: './', styles: [style.logo] });

  readonly avatar = new LinkView({
    url: '#/score',
    styles: [style.avatar],
    stateStyle: [['hidden', style.avatarHidden]],
  });

  readonly btnStateSwitch = new BtnView({
    styles: [style.btn, style.btnStateSwitch],
    stateStyle: [['hidden', style.btnHidden]],
    text: appConfig.header.btn.signUp,
  });

  private readonly navigation = {
    menu: Factory.view({ tag: 'nav', styles: [style.navMenu] }),
    list: Factory.view({ tag: 'ul', styles: [style.navItems] }),
  };

  constructor() {
    super({ tag: 'header', styles: [style.header] });

    this.render(
      Factory.view({
        styles: [style.wrapper],
        childs: [
          this.logo,
          this.navigation.menu,
          this.btnStateSwitch,
          this.avatar,
        ],
      })
    );
    this.navigation.menu.render(this.navigation.list);

    this.state.update();
    this.btnStateSwitch.onClick(() => this.state.update());
  }

  addNavLinks(navData: { url: string; text: string }[]): void {
    this.navLinks = navData.reduce(
      (dict, { url, text }) =>
        dict.set(url, new LinkView({ url, styles: [style.navLink], text })),
      new Map<string, LinkView>()
    );
    this.navigation.list.render(
      HeaderView.createNavItems([...this.navLinks.values()])
    );
  }

  getState(): HeaderState {
    return this.state;
  }

  setState(state: HeaderState): void {
    this.state = state;
  }

  setActiveNavLink(url: string): void {
    this.activeNavLink?.active(false);
    this.activeNavLink = this.navLinks?.get(url);
    this.activeNavLink?.active();
  }

  private static createNavItems(payload: View[]): View[] {
    return payload.map((link) =>
      Factory.view({
        tag: 'li',
        styles: [style.navItem],
        childs: [link],
      })
    );
  }
}

// После регистрации игрока в header должна появится кнопка позволяющая начать игру
// После нажатия на кнопку старт должен начинаться игровой цикл
// У игрока должна быть возможность остановить игру.
