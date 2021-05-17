import Router from '../router/router';
import { PageAbout, PageGame, PageSettings, PageScore } from '../pages/index';
import { IPage } from '../pages/base-page';
import Header from '../components/header/header';
import View from '../shared/views/view';
import Factory from '../shared/views/view-factory';
import style from './app.scss';
import { CardImagesService } from '../services/card-images-urls';

export default class App {
  readonly view: View;

  private header: Header;

  readonly pageContainer: View;

  readonly router = new Router();

  readonly pages: Record<string, IPage>;

  constructor(parent: HTMLElement) {
    this.pages = {
      about: new PageAbout(),
      game: new PageGame(new CardImagesService()),
      settings: new PageSettings(),
      score: new PageScore(),
    };

    this.header = new Header(
      this.mapPages((page) => ({ url: page.url, text: page.titleText }))
    );
    this.initHeader();
    this.pageContainer = new View({ styles: [style.pageContainer] });

    this.view = Factory.view({
      tag: 'main',
      styles: [style.app],
      childs: [this.header.view, this.pageContainer],
    });

    this.router.addRoute('', this.pages.about);
    this.mapPages((page) => this.router.addRoute(page.url, page));

    this.router.onChange(({ page }) => this.update(page));

    parent.append(this.view.element);
  }

  mapPages<T>(handler: (page: IPage) => T): T[] {
    return Object.values(this.pages).map(handler);
  }

  update(page: IPage): void {
    this.pageContainer.render(page.view);
    this.header.setActiveNavLink(page.url);
  }

  async start(): Promise<void> {
    window.location.hash = this.pages.game.url;
    this.update(this.router.currentRoute());
  }

  async startGame(): Promise<void> {
    window.location.hash = this.pages.game.url;
    this.update(this.router.currentRoute());
    await (<PageGame>this.pages.game).newGame('dogs', 12);
  }

  async stopGame(): Promise<void> {
    window.location.hash = this.pages.game.url;
    this.update(this.router.currentRoute());
    (<PageGame>this.pages.game).stopGame();
  }

  private initHeader() {
    this.header.view.observer.subscribe('start', () => this.startGame());
    this.header.view.observer.subscribe('stop', () => this.stopGame());
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
