import { appConfig } from '../../app/app.config';
import { Observer } from '../../shared/observer';
import { View } from '../../shared/views/view';
import { Factory } from '../../shared/views/view-factory';
import { BtnView } from '../../shared/views/btn/btn';
import { LinkView } from '../../shared/views/link/link';
import { NavMenuView } from '../nav-menu/nav-menu-view';
import { StateMashine } from '../../shared/state/state-mashine';
import { HeaderStateName, IHeaderContext, HeaderState } from './header-view-state';
import styles from './header-view.scss';

export class HeaderView extends View implements IHeaderContext {
  readonly observer = new Observer<HeaderStateName>();

  protected readonly stateMashine: StateMashine<HeaderStateName> =
    new StateMashine(
      new HeaderState('initial', 'ready', appConfig.header.btn.signUp, true)
    )
      .addState(
        new HeaderState('ready', 'game', appConfig.header.btn.start, false)
      )
      .addState(
        new HeaderState('game', 'ready', appConfig.header.btn.stop, false)
      );

  readonly logo = new LinkView({ url: './', classNames: [styles.logo] });

  readonly menu = new NavMenuView();

  readonly avatar = new LinkView({
    url: '#/score',
    classNames: [styles.avatar],
    statesClassNames: [['hidden', styles.avatarHidden]],
  });

  readonly btnStateSwitch = new BtnView({
    classNames: [styles.btn, styles.btnStateSwitch],
    statesClassNames: [['hidden', styles.btnHidden]],
  });

  constructor() {
    super({ tag: 'header', classNames: [styles.header] });

    this.render(
      Factory.view({
        classNames: [styles.wrapper],
        childs: [this.logo, this.menu, this.btnStateSwitch, this.avatar],
      })
    );

    this.stateMashine.applyCurrentState(this);
    this.btnStateSwitch.onClick(() => this.stateMashine.applyCurrentState(this));
  }

  getCurrentState(): HeaderStateName {
    return this.stateMashine.getCurrentState();
  }

  nextState(): void {
    this.stateMashine.applyCurrentState(this, false);
  }
}

// После регистрации игрока в header должна появится кнопка позволяющая начать игру
// После нажатия на кнопку старт должен начинаться игровой цикл
// У игрока должна быть возможность остановить игру.
