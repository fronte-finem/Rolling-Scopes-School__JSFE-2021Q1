import appConfig from '../../app/app.config';
import Observer from '../../shared/observer';
import BtnView from '../../shared/views/btn/btn';
import LinkView from '../../shared/views/link/link';
import View from '../../shared/views/view';
import Factory from '../../shared/views/view-factory';
import HeaderState from './state/base-state';
import HeaderStateInitial from './state/state-initial';
import style from './header-view.scss';
import NavMenuView from '../nav-menu/nav-menu-view';



export type HeaderViewEvent = 'initial' | 'sign-in' | 'start' | 'stop';

export default class HeaderView extends View {
  readonly observer = new Observer<HeaderViewEvent>();

  private state = new HeaderStateInitial(this);

  readonly logo = new LinkView({ url: './', styles: [style.logo] });

  readonly menu = new NavMenuView();

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

  constructor() {
    super({ tag: 'header', styles: [style.header] });

    this.render(
      Factory.view({
        styles: [style.wrapper],
        childs: [
          this.logo,
          this.menu,
          this.btnStateSwitch,
          this.avatar,
        ],
      })
    );

    this.state.update();
    this.btnStateSwitch.onClick(() => this.state.update());
  }

  getState(): HeaderState {
    return this.state;
  }

  setState(state: HeaderState): void {
    this.state = state;
  }
}

// После регистрации игрока в header должна появится кнопка позволяющая начать игру
// После нажатия на кнопку старт должен начинаться игровой цикл
// У игрока должна быть возможность остановить игру.
