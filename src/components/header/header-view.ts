import styles from './header-view.scss';
import { APP_CONFIG } from '../../app/app.config';
import { APP_HEADER_CONFIG } from '../../app/configs/header';
import { IHeaderContext, HeaderState } from './header-view-state';
import { AppStateName, IAppStateService } from '../../services/app-state';
import { Observer } from '../../shared/observer';
import { View } from '../../shared/views/view';
import { BtnView } from '../../shared/views/btn/btn';
import { LinkView } from '../../shared/views/link/link';
import { NavMenuView } from '../nav-menu/nav-menu-view';
import { StateMashine } from '../../shared/state/state-mashine';
import { IState } from '../../shared/state/types';
import { IUserService } from '../../services/user-service';
import { renderAvatar } from '../../shared/views/avatar-factory';

// После регистрации игрока в header должна появится кнопка позволяющая начать игру
// После нажатия на кнопку старт должен начинаться игровой цикл
// У игрока должна быть возможность остановить игру.

export class HeaderView extends View implements IHeaderContext {
  readonly observer = new Observer<AppStateName>();

  protected readonly stateMashine: StateMashine<AppStateName> =
    new StateMashine(
      new HeaderState(
        'initial',
        'ready',
        APP_HEADER_CONFIG.btns.signUp.text,
        true
      )
    )
      .addState(
        new HeaderState(
          'ready',
          'game',
          APP_HEADER_CONFIG.btns.start.text,
          false
        )
      )
      .addState(
        new HeaderState(
          'game',
          'ready',
          APP_HEADER_CONFIG.btns.stop.text,
          false
        )
      );

  readonly logo = new LinkView({
    url: APP_CONFIG.initialRoute.url,
    classNames: [styles.logo],
  });

  readonly menu = new NavMenuView();

  readonly avatar = new View({
    classNames: [styles.avatar],
  });

  readonly btnStateSwitch = new BtnView({
    classNames: [styles.btn, styles.btnStateSwitch],
  });

  constructor(
    private readonly appStateService: IAppStateService,
    private readonly userService: IUserService
  ) {
    super({ tag: 'header', classNames: [styles.header] });

    this.render(
      new View({
        classNames: [styles.wrapper],
        childs: [this.logo, this.menu, this.btnStateSwitch, this.avatar],
      })
    );

    this.stateMashine.applyCurrentState(this);

    this.btnStateSwitch.onClick(() => {
      const currentState = this.getCurrentState();
      appStateService
        .requestStateChange({ from: currentState.name, to: currentState.next })
        .then((allowed) => {
          if (allowed) this.stateMashine.nextState(this);
        }, null);
    });
  }

  getCurrentState(): IState<AppStateName> {
    return this.stateMashine.getCurrentState();
  }

  nextState(): void {
    this.stateMashine.nextState(this, false);
  }

  hideAvatar(hide = true): void {
    this.avatar.setCssState(styles.avatarHidden, hide);
    if (!hide && this.avatar.element.innerHTML === '') {
      const user = this.userService.currentUser;
      if (!user) return;
      renderAvatar(
        user,
        this.avatar,
        [styles.svgIcon, styles.avatarImg],
        [styles.avatarImg]
      );
    }
  }

  setBtnText(text: string): void {
    this.btnStateSwitch.setText(text);
  }
}

// После регистрации игрока в header должна появится кнопка позволяющая начать игру
// После нажатия на кнопку старт должен начинаться игровой цикл
// У игрока должна быть возможность остановить игру.
