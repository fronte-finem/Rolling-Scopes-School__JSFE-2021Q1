import appConfig from '../../../app/app.config';
import HeaderState from './base-state';
import HeaderStateStartGame from './state-start-game';

export default class HeaderStateStopGame extends HeaderState {
  update(): void {
    this.baseUpdate(
      'stop',
      appConfig.header.btn.start,
      false,
      HeaderStateStartGame
    );
  }
}
