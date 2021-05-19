import { ObserverLite, Listener } from '../shared/observer-lite';
import { IPage } from '../pages/base-page';
import { PageError } from '../pages/index';

export interface IRouterState {
  oldPage: IPage;
  newPage: IPage;
}

export class Router {
  private readonly observer = new ObserverLite();

  private readonly routes = new Map<string, IPage>();

  readonly errorPage = new PageError();

  private currentPage: IPage;

  constructor(readonly initialPage: IPage) {
    this.addRoute('', initialPage);
    this.currentPage = initialPage;

    window.addEventListener('hashchange', () =>
      this.observer.notify(this.updateCurrentRoute())
    );
  }

  onChange(listener: Listener<IRouterState>): void {
    this.observer.subscribe(listener);
  }

  addRoute(path: string, page: IPage): Router {
    this.routes.set(`${path}`, page);
    return this;
  }

  getRoutes(): IPage[] {
    return [...this.routes.values()];
  }

  getRoute(path: string): IPage {
    return this.routes.get(path) || this.errorPage;
  }

  activateRoute(path: string): void {
    window.location.hash = this.getRoute(path).url;
  }

  updateCurrentRoute(): IRouterState {
    const path = Router.getCurrentPath();
    const newPage = this.getRoute(path);
    const oldPage = this.currentPage;
    if (oldPage !== newPage) {
      oldPage.stop();
      newPage.init();
      this.currentPage = newPage;
    }
    return { oldPage, newPage };
  }

  static getCurrentPath(): string {
    return window.location.hash || '';
  }
}
