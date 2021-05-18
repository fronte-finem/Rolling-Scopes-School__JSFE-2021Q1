import { appConfig } from '../../../app/app.config';
import { HeaderState } from './base-state';
import { HeaderStateStartGame } from './state-start-game';

export class HeaderStateSignIn extends HeaderState {
  update(): void {
    this.baseUpdate(
      'sign-in',
      appConfig.header.btn.start,
      false,
      HeaderStateStartGame
    );
  }
}
