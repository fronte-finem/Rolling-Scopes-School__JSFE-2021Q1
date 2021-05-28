import { IPage } from '../pages/base-page';
import { PageError } from '../pages/index';
import { Listener, ObserverLite } from '../shared/observer-lite';
import { capitalize } from '../shared/string-utils';

const setTitle = (title: string) => `🎴 Match-Match 🃏 ${capitalize(title)} 🎴`;

const errorPageRoute: IRoute = {
  url: '#/⛔',
  title: 'Page Not Found!',
  pageCreator: () => new PageError(),
};

export type PageCreator = () => IPage;

export interface IRoute {
  readonly url: string;
  readonly title: string;
  readonly pageCreator: PageCreator;
}

export interface IRouterState {
  readonly oldUrl: string;
  readonly newUrl: string;
  readonly newPage?: IPage;
}

export class Router {
  private readonly observer = new ObserverLite();

  private readonly routes = new Map<string, IRoute>();

  public readonly errorPageRoute = errorPageRoute;

  private currentUrl = '';

  private currentPage?: IPage;

  public constructor() {
    window.addEventListener('hashchange', () =>
      this.observer.notify(this.updateCurrentRoute())
    );
  }

  public onChange(listener: Listener<IRouterState>): void {
    this.observer.subscribe(listener);
  }

  public addRoute(route: IRoute): Router {
    this.routes.set(route.url, route);
    return this;
  }

  private getPageRoute(url: string): IRoute {
    return this.routes.get(url) || this.errorPageRoute;
  }

  public updateCurrentRoute(): IRouterState {
    const oldUrl = this.currentUrl;
    const newUrl = Router.getCurrentUrl();
    if (oldUrl !== newUrl) {
      const route = this.getPageRoute(newUrl);
      setTitle(route.title);
      this.currentPage?.stop();
      this.currentPage = route.pageCreator();
      this.currentPage.init();
      this.currentUrl = newUrl;
    }
    return { oldUrl, newUrl, newPage: this.currentPage };
  }

  public static getCurrentUrl(): string {
    return window.location.hash || '';
  }

  public static activateRoute(url: string): void {
    window.location.hash = url;
  }
}
