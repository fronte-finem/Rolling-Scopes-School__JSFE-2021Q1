import { appConfig } from '../../../app/app.config';
import { HeaderState } from './base-state';
import { HeaderStateStopGame } from './state-stop-game';

export class HeaderStateStartGame extends HeaderState {
  update(): void {
    this.baseUpdate(
      'start',
      appConfig.header.btn.stop,
      false,
      HeaderStateStopGame
    );
  }
}
