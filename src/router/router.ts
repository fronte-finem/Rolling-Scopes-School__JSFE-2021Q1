import { ObserverLite, Listener } from '../shared/observer-lite';
import { IPage } from '../pages/base-page';
import { PageError } from '../pages/index';


export type PageCreator = () => IPage;

export interface IRoute {
  url: string;
  pageCreator: PageCreator;
}

export interface IRouterState {
  oldUrl: string;
  newUrl: string;
  newPage?: IPage;
}

export class Router {
  private readonly observer = new ObserverLite();

  private readonly routes = new Map<string, PageCreator>();

  readonly errorPageCreator: PageCreator = () => new PageError();

  private currentUrl = '';

  private currentPage?: IPage;

  constructor() {
    window.addEventListener('hashchange', () =>
      this.observer.notify(this.updateCurrentRoute())
    );
    // Router.activateRoute(this.currentUrl);
  }

  onChange(listener: Listener<IRouterState>): void {
    this.observer.subscribe(listener);
  }

  addRoute({ url, pageCreator }: IRoute): Router {
    this.routes.set(url, pageCreator);
    return this;
  }

  getUrls(): string[] {
    return [...this.routes.keys()];
  }

  private getPageCreator(path: string): PageCreator {
    return this.routes.get(path) || this.errorPageCreator;
  }

  updateCurrentRoute(): IRouterState {
    const oldUrl = this.currentUrl;
    const newUrl = Router.getCurrentUrl();
    if (oldUrl !== newUrl) {
      this.currentPage?.stop();
      this.currentPage = this.getPageCreator(newUrl)();
      this.currentPage.init();
      this.currentUrl = newUrl;
    }
    return { oldUrl, newUrl, newPage: this.currentPage };
  }
 
  static getCurrentUrl(): string {
    return window.location.hash || '';
  }

  static activateRoute(url: string): void {
    window.location.hash = url;
  }
}
