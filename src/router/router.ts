import { State } from '../shared/types';
import { ObserverLite, Listener } from '../shared/observer-lite';
import { IPage } from '../pages/base-page';
import { PageError } from '../pages/index';

export interface IRouterState extends State {
  page: IPage;
}

export class Router {
  private readonly observer = new ObserverLite<IRouterState>();

  private readonly routes = new Map<string, IPage>();

  private readonly pageError = new PageError();

  private readonly currentPage?: IPage;

  constructor() {
    window.addEventListener('hashchange', () => this.notifyChange());
  }

  onChange(listener: Listener<IRouterState>): void {
    this.observer.subscribe(listener);
  }

  notifyChange(): void {
    this.observer.notify({ page: this.currentRoute() });
  }

  currentRoute(): IPage {
    const page = this.getRoute(Router.parseLocation());
    Router.updateTitle(page.titleText);
    return page;
  }

  getRoute(path: string): IPage {
    return this.routes.get(path) || this.pageError;
  }

  addRoute(path: string, page: IPage): void {
    this.routes.set(`${path}`, page);
  }

  static parseLocation(): string {
    return window.location.hash || '';
  }

  static updateTitle(text: string): void {
    document.title = `🎴 Match-Match 🃏 ${text} 🎴`;
  }
}
