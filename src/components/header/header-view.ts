import { AppStateName, IAppStateService } from '../../services/app-state';
import { APP_CONFIG } from '../../app/app.config';
import { Observer } from '../../shared/observer';
import { View } from '../../shared/views/view';
import { Factory } from '../../shared/views/view-factory';
import { BtnView } from '../../shared/views/btn/btn';
import { LinkView } from '../../shared/views/link/link';
import { NavMenuView } from '../nav-menu/nav-menu-view';
import { StateMashine } from '../../shared/state/state-mashine';
import { IHeaderContext, HeaderState } from './header-view-state';
import styles from './header-view.scss';

// После регистрации игрока в header должна появится кнопка позволяющая начать игру
// После нажатия на кнопку старт должен начинаться игровой цикл
// У игрока должна быть возможность остановить игру.

export class HeaderView extends View implements IHeaderContext {
  readonly observer = new Observer<AppStateName>();

  protected readonly stateMashine: StateMashine<AppStateName> =
    new StateMashine(
      new HeaderState('initial', 'ready', APP_CONFIG.header.btn.signUp, true)
    )
      .addState(
        new HeaderState('ready', 'game', APP_CONFIG.header.btn.start, false)
      )
      .addState(
        new HeaderState('game', 'ready', APP_CONFIG.header.btn.stop, false)
      );

  readonly logo = new LinkView({
    url: APP_CONFIG.initialRoute.url,
    classNames: [styles.logo],
  });

  readonly menu = new NavMenuView();

  readonly avatar = new LinkView({
    url: '#/score',
    classNames: [styles.avatar],
  });

  readonly btnStateSwitch = new BtnView({
    classNames: [styles.btn, styles.btnStateSwitch],
  });

  constructor(private readonly appStateService: IAppStateService) {
    super({ tag: 'header', classNames: [styles.header] });

    this.render(
      Factory.view({
        classNames: [styles.wrapper],
        childs: [this.logo, this.menu, this.btnStateSwitch, this.avatar],
      })
    );

    this.stateMashine.applyCurrentState(this);

    this.btnStateSwitch.onClick(() => {
      appStateService
        .requestStateChange(this.getCurrentState())
        .then((allowed) => {
          if (allowed) this.stateMashine.nextState(this);
        }, null);
    });
  }

  getCurrentState(): AppStateName {
    return this.stateMashine.getCurrentState();
  }

  nextState(): void {
    this.stateMashine.nextState(this, false);
  }

  hideAvatar(hide = true): void {
    this.avatar.setCssState(styles.avatarHidden, hide);
  }

  setBtnText(text: string): void {
    this.btnStateSwitch.setText(text);
  }
}

// После регистрации игрока в header должна появится кнопка позволяющая начать игру
// После нажатия на кнопку старт должен начинаться игровой цикл
// У игрока должна быть возможность остановить игру.
