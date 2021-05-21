import { AppStateName, ProxyAppStateService } from '../services/app-state';
import { APP_CONFIG } from './app.config';
import { IRouterState, Router } from '../router/router';
import { View } from '../shared/views/view';
import { Factory } from '../shared/views/view-factory';
import { HeaderView } from '../components/header/header-view';
import styles from './app.scss';
import { ModalView } from '../components/modal/modal-view';
import { PopUpView } from '../components/pop-up/pop-up-view';

export class App {
  readonly view: View;

  private headerView = new HeaderView(
    new ProxyAppStateService((state) => this.handleAppStateChangeRequest(state))
  );

  readonly pageContainer: View;
  
  readonly modalView = new ModalView();

  readonly router = new Router();

  private gameStoppedByButton = false;

  constructor(parent: HTMLElement) {
    Object.values(APP_CONFIG.pages).reduce(
      (router, page) => router.addRoute(page.route),
      this.router
    );
    this.router.onChange((state) => this.applayRouteChange(state));

    this.initHeader();
    this.pageContainer = new View({ classNames: [styles.pageContainer] });

    this.view = Factory.view({
      tag: 'main',
      classNames: [styles.app],
      childs: [this.headerView, this.pageContainer, this.modalView],
    });
    parent.append(this.view.element);
  }

  start(): void {
    Router.activateRoute(APP_CONFIG.initialRoute.url);
    this.headerView.menu.setActiveNavLink(APP_CONFIG.initialRoute.url);
  }

  applayRouteChange({ oldUrl, newUrl, newPage }: IRouterState): void {
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

  async handleAppStateChangeRequest(stateName: AppStateName): Promise<boolean> {
    console.log(stateName);
    await new Promise((rs) => rs(true));
    switch (stateName) {
      case 'initial':
        return await this.processInitialAppState();
      case 'ready':
        this.gameStoppedByButton = false;
        Router.activateRoute(APP_CONFIG.pages.game.route.url);
        return true;
      case 'game':
        if (Router.getCurrentUrl() === APP_CONFIG.pages.game.route.url) {
          this.gameStoppedByButton = true;
          Router.activateRoute(APP_CONFIG.initialRoute.url);
        }
        return true;
      default:
        return false;
    }
  }

  async processInitialAppState(): Promise<boolean> {
    const popup = new PopUpView('Registr new Player');
    this.modalView.render(popup);
    await this.modalView.show();
    this.modalView.onClick(() => {
      popup.hide().then(() => this.modalView.hide()).then(null, null);
    });
    const allowed = await popup.process();
    await this.modalView.hide();
    return allowed;
  }
}

// Todo:
// При регистрации должна быть следующее правило проверки вводимых значений:

// Имя:
// - Имя не может быть пустым.
// - Имя не может состоять из цифр.
// - Имя не может содержать служебные символы (~ ! @ # $ % * () _ — + = | : ; " ' ` < > , . ? / ^).

// Фамилия:
// - Фамилия не может быть пустой.
// - Фамилия не может состоять из цифр.
// - Фамилия не может содержать служебные символы. (~ ! @ # $ % * () _ — + = | : ; " ' ` < > , . ? / ^)

// email:
// - email не может быть пустым.
// - должен соответствовать стандартному правилу формированию email
//   [RFC](https://en.wikipedia.org/wiki/Email_address#Standards_documents)

// Форма в целом:
// - Возможно использование любого языка для ввода имени и фамилии.
// - Колличество символов не должно превышать 30 символов включая пробелы
// - В случае несоответствия любого из вышеуказанных правил, необходимо блокировать кнопку создания пользователя
// - Все неправильные поля должны быть подсвечены и иметь соответствующие сообщения об ошибках.
// - После нажатия на кнопку создания игрока страница не должна перезагружаться.
// - После нажатия на кнопку cancel вся ранее заполненная информация должна быть сброшена.

// Если все данные игрока корректны, все правильно заполненные поля должны быть помеченные как правильные.

// После регистрации игрока в header должна появится кнопка позволяющая начать игру
// После нажатия на кнопку старт должен начинаться игровой цикл
// У игрока должна быть возможность остановить игру.

// Реализована механика добавления аватара игрока, который хранится в indexedDb в base64 формате и отображается в header и на странице рекордов.
