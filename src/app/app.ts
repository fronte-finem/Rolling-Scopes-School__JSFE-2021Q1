import RouteChangedEvent from '../router/route-changed-event';
import Router from '../router/router';
import { PageAbout, PageGame, PageSettings, PageScore } from '../pages/index';
import { IPageView } from '../pages/base-page';
import Header from '../components/header/header';
import View from '../shared/view';
import Factory from '../shared/view-factory';
import style from './app.scss';

export default class App {
  readonly view: View;

  readonly header: Header;

  readonly pageContainer: View;

  readonly router = new Router();

  constructor(parent: HTMLElement) {
    const pages = [
      new PageAbout(),
      new PageGame(),
      new PageSettings(),
      new PageScore(),
    ];

    this.header = new Header(
      pages.map((page) => ({ url: page.titleUrl, text: page.titleText }))
    );
    this.pageContainer = new View({ styles: [style.pageContainer] });

    this.view = Factory.view({
      tag: 'main',
      styles: [style.app],
      childs: [this.header.view, this.pageContainer],
    });

    this.router.addRoute('', pages[0]);
    pages.forEach((page) => this.router.addRoute(page.titleUrl, page));

    this.router.onChange((event: RouteChangedEvent) => this.update(event.data));

    parent.append(this.view.element);
  }

  update(page: IPageView): void {
    this.pageContainer.render([page]);
    this.header.setActiveNavLink(page.titleUrl);
  }

  start(): void {
    this.update(this.router.currentRoute());
  }
}
