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

  readonly header: Header;

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
    this.pageContainer.render([page.view]);
    this.header.setActiveNavLink(page.url);
  }

  async start(): Promise<void> {
    window.location.hash = this.pages.game.url;
    this.update(this.router.currentRoute());
    await (<PageGame>this.pages.game).newGame('cats', 12);
  }
}
