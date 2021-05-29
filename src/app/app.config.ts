import { deepFreeze } from 'shared/object-utils';

import {
  APP_PAGE_ABOUT_CONFIG,
  APP_PAGE_GAME_CONFIG,
  APP_PAGE_SCORE_CONFIG,
  APP_PAGE_SETTINGS_CONFIG,
} from './configs/pages.config';

export const APP_CONFIG = deepFreeze({
  initialRoute: APP_PAGE_ABOUT_CONFIG.route,
  pages: {
    about: APP_PAGE_ABOUT_CONFIG,
    score: APP_PAGE_SCORE_CONFIG,
    settings: APP_PAGE_SETTINGS_CONFIG,
    game: APP_PAGE_GAME_CONFIG,
  },
});
