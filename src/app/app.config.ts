import { PageAbout, PageGame, PageScore, PageSettings } from '../pages/index';
import { IRoute } from '../router/router';
import { CardImagesService } from '../services/card-images-urls';

export interface IAppConfig {
  readonly initialRoute: IRoute;
  readonly pages: {
    readonly about: IPageConfig;
    readonly score: IPageConfig;
    readonly settings: IPageConfig;
    readonly game: IPageConfig;
  };
  readonly header: IHeaderConfig;
}

export interface IPageConfig {
  readonly title: string;
  readonly route: IRoute;
  readonly navSvgIcon?: string;
}

export interface IHeaderConfig {
  readonly btn: {
    readonly signUp: string;
    readonly start: string;
    readonly stop: string;
  };
}

const cardImagesService = new CardImagesService();

const initialRoute: Readonly<IRoute> = {
  url: '#/about-game',
  pageCreator: () => new PageAbout(),
};

export const APP_CONFIG: Readonly<IAppConfig> = {
  initialRoute,
  pages: {
    about: {
      title: 'about game',
      route: { url: '#/about-game', pageCreator: () => new PageScore() },
      navSvgIcon: './svg/sprite.svg#icon-question-mark',
    },
    score: {
      title: 'best score',
      route: { url: '#/best-score', pageCreator: () => new PageScore() },
      navSvgIcon: './svg/sprite.svg#icon-star',
    },
    settings: {
      title: 'game settings',
      route: { url: '#/game-settings', pageCreator: () => new PageSettings() },
      navSvgIcon: './svg/sprite.svg#icon-gear',
    },
    game: {
      title: 'about game',
      route: {
        url: '#/game',
        pageCreator: () => new PageGame(cardImagesService),
      },
    },
  },
  header: {
    btn: {
      signUp: 'register new player',
      start: 'start game',
      stop: 'stop game',
    },
  },
};
