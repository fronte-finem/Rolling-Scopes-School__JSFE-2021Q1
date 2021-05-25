import { IAppConfig } from './configs/types';
import { APP_HEADER_CONFIG } from './configs/header';
import {
  APP_PAGE_ABOUT_CONFIG,
  APP_PAGE_SCORE_CONFIG,
  APP_PAGE_SETTINGS_CONFIG,
  APP_PAGE_GAME_CONFIG,
} from './configs/pages';
import { APP_POPUP_SINGUP_CONFIG } from './configs/popups';

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
