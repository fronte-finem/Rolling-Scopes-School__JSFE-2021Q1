import { AppState } from '../../services/app-state';
import { IContext, IState } from '../../shared/state/types';

export interface IHeaderContext extends IContext<AppState> {
  setBtnText(text: string): void;
  hideAvatar(hide: boolean): void;
}

export class HeaderState implements IState<AppState> {
  constructor(
    readonly name: AppState,
    readonly next: AppState,
    private readonly btnText: string,
    private readonly hideAvatar: boolean
  ) {}

  apply(headerContext: IHeaderContext): void {
    headerContext.setBtnText(this.btnText);
    headerContext.hideAvatar(this.hideAvatar);
  }
}
