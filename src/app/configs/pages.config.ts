import { PageAbout, PageGame, PageScore, PageSettings } from 'pages/index';

import { ROUTE, SVGICON, TITLE } from './routes.config';
import {
  appStateService,
  cardImagesService,
  gameSettingsService,
  userService,
} from './services.config';
import { IPageConfig } from './types.config';

export const APP_PAGE_ABOUT_CONFIG: Readonly<IPageConfig> = {
  route: {
    url: ROUTE.ABOUT,
    title: TITLE.ABOUT,
    pageCreator: () => new PageAbout(),
  },
  navSvgIcon: SVGICON.ABOUT,
};

export const APP_PAGE_GAME_CONFIG: Readonly<IPageConfig> = {
  route: {
    url: ROUTE.GAME,
    title: TITLE.GAME,
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
    url: ROUTE.SETTINGS,
    title: TITLE.SETTINGS,
    pageCreator: () => new PageSettings(gameSettingsService),
  },
  navSvgIcon: SVGICON.SETTINGS,
};

export const APP_PAGE_SCORE_CONFIG: Readonly<IPageConfig> = {
  route: {
    url: ROUTE.SCORE,
    title: TITLE.SCORE,
    pageCreator: () => new PageScore(userService),
  },
  navSvgIcon: SVGICON.SCORE,
};
