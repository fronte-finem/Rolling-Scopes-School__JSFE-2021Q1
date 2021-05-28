import { APP_CONFIG } from '../../app/app.config';
import { APP_HEADER_CONFIG } from '../../app/configs/header.config';
import { AppState, IAppStateService } from '../../services/app-state';
import { IUserService } from '../../services/user-service';
import { Observer } from '../../shared/observer';
import { StateMaсhine } from '../../shared/state/state-maсhine';
import { renderAvatar } from '../../shared/views/avatar-factory';
import { BtnView } from '../../shared/views/btn/btn';
import { LinkView } from '../../shared/views/link/link';
import { View } from '../../shared/views/view';
import { NavMenuView } from '../nav-menu/nav-menu-view';

import { HeaderState, IHeaderContext } from './header-view-state';

import styles from './header-view.scss';

// После регистрации игрока в header должна появится кнопка позволяющая начать игру
// После нажатия на кнопку старт должен начинаться игровой цикл
// У игрока должна быть возможность остановить игру.

export class HeaderView extends View implements IHeaderContext {
  public readonly observer = new Observer<AppState>();

  protected readonly stateMaсhine: StateMaсhine<AppState> = new StateMaсhine(
    new HeaderState(
      AppState.INITIAL,
      AppState.READY,
      APP_HEADER_CONFIG.btns.signUp.text,
      true
    )
  )
    .addState(
      new HeaderState(
        AppState.READY,
        AppState.GAME,
        APP_HEADER_CONFIG.btns.start.text,
        false
      )
    )
    .addState(
      new HeaderState(
        AppState.GAME,
        AppState.READY,
        APP_HEADER_CONFIG.btns.stop.text,
        false
      )
    );

  public readonly logo = new LinkView({
    url: APP_CONFIG.initialRoute.url,
    classNames: [styles.logo],
  });

  public readonly menu = new NavMenuView();

  public readonly avatar = new View({
    classNames: [styles.avatar],
  });

  public readonly btnStateSwitch = new BtnView({
    classNames: [styles.btn, styles.btnStateSwitch],
  });

  public constructor(
    private readonly appStateService: IAppStateService,
    private readonly userService: IUserService
  ) {
    super({ tag: 'header', classNames: [styles.header] });
    this.init();
    this.initStateSwitcher();
    this.stateMaсhine.applyCurrentState(this);
  }

  private init(): void {
    this.render(
      new View({
        classNames: [styles.wrapper],
        childs: [this.logo, this.menu, this.btnStateSwitch, this.avatar],
      })
    );
  }

  private initStateSwitcher(): void {
    this.btnStateSwitch.onClick(async () => {
      const currentState = this.stateMaсhine.getCurrentState();
      const allowed = await this.appStateService.requestStateChange({
        from: currentState.name,
        to: currentState.next,
      });
      if (allowed) this.stateMaсhine.nextState(this);
    });
  }

  public nextState(): void {
    this.stateMaсhine.nextState(this, false);
  }

  public hideAvatar(hide = true): void {
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

  public setBtnText(text: string): void {
    this.btnStateSwitch.setText(text);
  }
}

// После регистрации игрока в header должна появится кнопка позволяющая начать игру
// После нажатия на кнопку старт должен начинаться игровой цикл
// У игрока должна быть возможность остановить игру.
