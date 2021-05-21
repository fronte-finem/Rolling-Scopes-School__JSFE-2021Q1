import { PageAbout, PageGame, PageScore, PageSettings } from '../pages/index';
import { IRoute } from '../router/router';
import { CardImagesService } from '../services/card-images-urls';
import { GameSettingsService } from '../services/game-settings';
import { APP_GAME_INITIAL_CONFIG } from './app.game.config';

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
const gameSettingsService = new GameSettingsService(APP_GAME_INITIAL_CONFIG.settings);

const initialRoute: Readonly<IRoute> = {
  url: '#/about-game',
  title: 'about game',
  pageCreator: () => new PageAbout(),
};

export const APP_CONFIG: Readonly<IAppConfig> = {
  initialRoute,
  pages: {
    about: {
      route: initialRoute,
      navSvgIcon: './svg/sprite.svg#icon-question-mark',
    },
    score: {
      route: {
        url: '#/best-score',
        title: 'best score',
        pageCreator: () => new PageScore(),
      },
      navSvgIcon: './svg/sprite.svg#icon-star',
    },
    settings: {
      route: {
        url: '#/game-settings',
        title: 'game settings',
        pageCreator: () => new PageSettings(gameSettingsService),
      },
      navSvgIcon: './svg/sprite.svg#icon-gear',
    },
    game: {
      route: {
        url: '#/game',
        title: 'about game',
        pageCreator: () => new PageGame(gameSettingsService, cardImagesService),
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
