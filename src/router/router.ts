import Observer, { IListener } from '../shared/observer';
import RouteChangedEvent from './route-changed-event';
import { IPageView } from '../pages/base-page';
import { PageError } from '../pages/index';

export default class Router extends Observer<IPageView> {
  private readonly routes: Map<string, IPageView> = new Map();

  private readonly pageError = new PageError();

  constructor() {
    super();
    window.addEventListener('hashchange', () => this.notifyChange());
  }

  onChange(listener: IListener<IPageView>): void {
    this.subscribe(RouteChangedEvent, listener);
  }

  notifyChange(): void {
    this.notify(new RouteChangedEvent(this.currentRoute()));
  }

  currentRoute(): IPageView {
    const page = this.getRoute(Router.parseLocation());
    Router.updateTitle(page.titleText);
    return page;
  }

  getRoute(path: string): IPageView {
    return this.routes.get(path) || this.pageError;
  }

  addRoute(path: string, page: IPageView): void {
    this.routes.set(`${path}`, page);
  }

  static parseLocation(): string {
    return window.location.hash || '';
  }

  static updateTitle(text: string): void {
    document.title = `🎴 Match-Match 🃏 ${text} 🎴`;
  }
}
