import { IAppStateChangeRequest } from '../services/app-state';
import { APP_CONFIG } from './app.config';
import { IRouterState, Router } from '../router/router';
import { View } from '../shared/views/view';
import { HeaderView } from '../components/header/header-view';
import { ModalView } from '../components/modal/modal-view';
import { PopUpSignUpView } from '../components/pop-up-sign-up/pop-up-sign-up-view';
import { PopUpVictoryView } from '../components/pop-up-victory/pop-up-victory-view';
import { appStateService, userService } from './configs/services';
import styles from './app.scss';
import { PopUpView } from '../components/pop-up/pop-up-view';

export class App {
  readonly view: View;

  private headerView = new HeaderView(appStateService, userService);

  readonly pageContainer: View;

  readonly modalView = new ModalView();

  readonly router = new Router();

  private gameStoppedByButton = false;

  constructor(parent: HTMLElement) {
    appStateService.init((request) =>
      this.handleAppStateChangeRequest(request)
    );

    Object.values(APP_CONFIG.pages).reduce(
      (router, page) => router.addRoute(page.route),
      this.router
    );
    this.router.onChange((state) => this.applayRouteChange(state));

    this.initHeader();
    this.pageContainer = new View({ classNames: [styles.pageContainer] });

    this.view = new View({
      tag: 'main',
      classNames: [styles.app],
    });
    this.view.render([this.headerView, this.pageContainer, this.modalView]);
    parent.append(this.view.element);
  }

  async start(): Promise<void> {
    Router.activateRoute(APP_CONFIG.initialRoute.url);
    this.headerView.menu.setActiveNavLink(APP_CONFIG.initialRoute.url);
    await userService.init();
    // await userService.init(true);
    // await this.showPopup(new PopUpVictoryView(userService))
  }

  private applayRouteChange({ oldUrl, newUrl, newPage }: IRouterState): void {
    if (
      oldUrl === APP_CONFIG.pages.game.route.url &&
      !this.gameStoppedByButton
    ) {
      this.headerView.nextState();
    }
    if (newPage) {
      this.pageContainer.render(newPage.view);
    }
    this.headerView.menu.setActiveNavLink(newUrl);
  }

  private initHeader() {
    this.headerView.menu.addNavLinks(Object.values(APP_CONFIG.pages));
  }

  private async handleAppStateChangeRequest(
    request: IAppStateChangeRequest
  ): Promise<boolean> {
    // console.log(request);
    await new Promise((rs) => rs(true));
    switch (request.from) {
      case 'initial':
        return await this.processPopUp(new PopUpSignUpView(userService));
      case 'ready':
        this.gameStoppedByButton = false;
        Router.activateRoute(APP_CONFIG.pages.game.route.url);
        return true;
      case 'game':
        if (request.to === 'ready') {
          if (Router.getCurrentUrl() === APP_CONFIG.pages.game.route.url) {
            this.gameStoppedByButton = true;
            Router.activateRoute(APP_CONFIG.initialRoute.url);
          }
        } else if (request.to === 'solved') {
          await this.processPopUp(new PopUpVictoryView(userService));
          Router.activateRoute(APP_CONFIG.pages.score.route.url);
        }
        return true;
      case 'solved':
        return true;
      default:
        return false;
    }
  }

  private async processPopUp(popup: PopUpView): Promise<boolean> {
    await this.showPopup(popup);
    const isDone = await popup.task();
    await this.hidePopup(popup);
    return isDone;
  }

  private async showPopup(popup: PopUpView) {
    this.modalView.render(popup);
    this.modalView.onClick(() => {
      this.hidePopup(popup).then(null, null);
    });
    await this.modalView.show();
    await popup.show();
  }

  private async hidePopup(popup: PopUpView) {
    await Promise.all([popup.hide(), this.modalView.hide()]);
  }
}

// Todo:
// После регистрации игрока в header должна появится кнопка позволяющая начать игру
// После нажатия на кнопку старт должен начинаться игровой цикл
// У игрока должна быть возможность остановить игру.

// Реализована механика добавления аватара игрока, который хранится в indexedDb в base64 формате и отображается в header и на странице рекордов.
