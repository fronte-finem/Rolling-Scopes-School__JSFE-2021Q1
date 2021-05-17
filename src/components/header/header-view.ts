import appConfig from '../../app/app.config';
import Observer from '../../shared/observer';
import BtnView from '../../shared/views/btn/btn';
import LinkView from '../../shared/views/link/link';
import View from '../../shared/views/view';
import Factory from '../../shared/views/view-factory';
import style from './header.scss';
import HeaderState from './state/base-state';
import HeaderStateInitial from './state/state-initial';

export type HeaderViewEvent = 'initial' | 'sign-in' | 'start' | 'stop';

export default class HeaderView extends View {
  readonly observer = new Observer<HeaderViewEvent>();

  private state = new HeaderStateInitial(this);

  readonly navLinks: Map<string, LinkView>;

  private activeNavLink: LinkView | undefined;

  readonly logo = new LinkView({ url: '#/about', styles: [style.logo] });

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

  constructor(navData: { url: string; text: string }[]) {
    super({ tag: 'header', styles: [style.header] });

    this.navLinks = navData.reduce(
      (dict, { url, text }) =>
        dict.set(url, new LinkView({ url, styles: [style.navLink], text })),
      new Map<string, LinkView>()
    );

    this.render(
      Factory.view({
        styles: [style.wrapper],
        childs: [
          this.logo,
          HeaderView.createNavMenu([...this.navLinks.values()]),
          this.btnStateSwitch,
          this.avatar,
        ],
      }),
    );

    this.state.update();
    this.btnStateSwitch.onClick(() => this.state.update());
  }

  setState(state: HeaderState): void {
    this.state = state;
  }

  setActiveNavLink(url: string): void {
    this.activeNavLink?.active(false);
    this.activeNavLink = this.navLinks?.get(url);
    this.activeNavLink?.active();
  }

  private static createBtn(selfStyle: string, text: string): BtnView {
    return new BtnView({
      styles: [style.btn, selfStyle],
      stateStyle: [['hidden', style.btnHidden]],
      text,
    });
  }

  private static createNavMenu(payload: View[]): View {
    return Factory.view({
      tag: 'nav',
      styles: [style.navMenu],
      childs: [
        {
          tag: 'ul',
          styles: [style.navItems],
          childs: HeaderView.createNavItems(payload),
        },
      ],
    });
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
