import { IRoute } from '../../router/router';
import {
  appStateService,
  cardImagesService,
  gameSettingsService,
  userService,
} from './services.config';
import {
  PageAbout,
  PageGame,
  PageSettings,
  PageScore,
} from '../../pages/index';

export interface IPageConfig {
  readonly route: IRoute;
  readonly navSvgIcon?: string;
}

export const APP_PAGE_ABOUT_CONFIG: Readonly<IPageConfig> = {
  route: {
    url: '#/about-game',
    title: 'about game',
    pageCreator: () => new PageAbout(),
  },
  navSvgIcon: './svg/sprite.svg#icon-question-mark',
};

export const APP_PAGE_GAME_CONFIG: Readonly<IPageConfig> = {
  route: {
    url: '#/game',
    title: 'about game',
    pageCreator: () =>
      new PageGame(
        appStateService,
        gameSettingsService,
        cardImagesService,
        userService
      ),
  },
};

export const APP_PAGE_SETTINGS_CONFIG: Readonly<IPageConfig> = {
  route: {
    url: '#/game-settings',
    title: 'game settings',
    pageCreator: () => new PageSettings(gameSettingsService),
  },
  navSvgIcon: './svg/sprite.svg#icon-gear',
};

export const APP_PAGE_SCORE_CONFIG: Readonly<IPageConfig> = {
  route: {
    url: '#/best-score',
    title: 'best score',
    pageCreator: () => new PageScore(userService),
  },
  navSvgIcon: './svg/sprite.svg#icon-star',
};
