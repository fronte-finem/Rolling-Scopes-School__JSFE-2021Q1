import { ProxyAppStateService } from '../../services/app-state';
import { CardImagesService } from '../../services/card-images-urls';
import { GameSettingsService } from '../../services/game-settings';
import { UserService } from '../../services/user-service';
import { APP_GAME_INITIAL_CONFIG } from '../app.game.config';

export const appStateService = new ProxyAppStateService();
export const userService = new UserService();
export const cardImagesService = new CardImagesService();
export const gameSettingsService = new GameSettingsService(
  APP_GAME_INITIAL_CONFIG.settings
);
