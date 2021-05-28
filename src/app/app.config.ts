import { IRoute } from '../router/router';

import { APP_HEADER_CONFIG, IHeaderConfig } from './configs/header.config';
import {
  APP_PAGE_ABOUT_CONFIG,
  APP_PAGE_GAME_CONFIG,
  APP_PAGE_SCORE_CONFIG,
  APP_PAGE_SETTINGS_CONFIG,
  IPageConfig,
} from './configs/pages.config';
import { APP_POPUP_SINGUP_CONFIG, IPopUpConfig } from './configs/popups.config';

export interface IAppConfig {
  readonly initialRoute: IRoute;
  readonly header: IHeaderConfig;
  readonly pages: Record<string, IPageConfig>;
  readonly popups: Record<string, IPopUpConfig<string, string>>;
}

export const APP_CONFIG: Readonly<IAppConfig> = {
  initialRoute: APP_PAGE_ABOUT_CONFIG.route,
  header: APP_HEADER_CONFIG,
  pages: {
    about: APP_PAGE_ABOUT_CONFIG,
    score: APP_PAGE_SCORE_CONFIG,
    settings: APP_PAGE_SETTINGS_CONFIG,
    game: APP_PAGE_GAME_CONFIG,
  },
  popups: {
    signUp: APP_POPUP_SINGUP_CONFIG,
  },
};
