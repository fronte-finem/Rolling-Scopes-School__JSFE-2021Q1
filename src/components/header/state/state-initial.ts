import { appConfig } from '../../../app/app.config';
import { HeaderState } from './base-state';
import { HeaderStateSignIn } from './state-sign-in';

export class HeaderStateInitial extends HeaderState {
  update(): void {
    this.baseUpdate(
      'initial',
      appConfig.header.btn.signUp,
      true,
      HeaderStateSignIn
    );
  }
}
