import { IRouterState, Router } from '../router/router';
import { PageAbout, PageGame, PageSettings, PageScore } from '../pages/index';
import { Header } from '../components/header/header';
import { View } from '../shared/views/view';
import { Factory } from '../shared/views/view-factory';
import { CardImagesService } from '../services/card-images-urls';
import { appConfig } from './app.config';
import { HeaderStateName } from '../components/header/header-view-state';
import styles from './app.scss';

export class App {
  readonly view: View;

  private header = new Header();

  readonly pageContainer: View;

  readonly router = new Router(new PageAbout());
  
  private gameStoppedByButton = false;

  constructor(parent: HTMLElement) {
    this.router
      .addRoute('#/about-game', this.router.initialPage)
      .addRoute('#/game', new PageGame(new CardImagesService()))
      .addRoute('#/game-settings', new PageSettings())
      .addRoute('#/best-score', new PageScore());

    this.router.onChange((routerState) => this.applayRouteChange(routerState));

    this.initHeader();
    this.pageContainer = new View({ classNames: [styles.pageContainer] });

    this.view = Factory.view({
      tag: 'main',
      classNames: [styles.app],
      childs: [this.header.view, this.pageContainer],
    });
    parent.append(this.view.element);
  }

  start(): void {
    window.location.hash = this.router.initialPage.url;
    this.applayRouteChange(this.router.updateCurrentRoute());
  }

  applayRouteChange({ oldPage, newPage }: IRouterState): void {
    if (
      oldPage === this.router.getRoute('#/game') &&
      !this.gameStoppedByButton
    ) {
      this.header.view.nextState();
    }
    this.pageContainer.render(newPage.view);
    this.header.setActiveNavLink(newPage.url);
  }

  private initHeader() {
    this.header.addNavLinks(appConfig.header.navMenu);
    this.header.view.observer.subscribe(
      'game',
      (stateName: HeaderStateName) => this.applayHeaderState(stateName)
    );
    this.header.view.observer.subscribe(
      'ready',
      (stateName: HeaderStateName) => this.applayHeaderState(stateName)
    );
  }

  applayHeaderState(stateName: HeaderStateName): void {
    switch (stateName) {
      case 'game':
        this.gameStoppedByButton = false;
        this.router.activateRoute('#/game');
        break;
      case 'ready':
        if (Router.getCurrentPath() === '#/game') {
          this.gameStoppedByButton = true;
          this.router.activateRoute('#/about-game');
        }
        break;
      default:
        break;
    }
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
