import { AppStateName } from '../../services/app-state';
import { IContext } from '../../shared/state/types';
import { State } from '../../shared/state/state';

export interface IHeaderContext extends IContext<AppStateName> {
  setBtnText(text: string): void;
  hideAvatar(hide: boolean): void;
}

export class HeaderState extends State<AppStateName> {
  constructor(
    readonly name: AppStateName,
    readonly next: AppStateName,
    readonly btnText: string,
    readonly hideAvatar: boolean
  ) {
    super(name, next);
  }

  apply(headerContext: IHeaderContext): void {
    headerContext.setBtnText(this.btnText);
    headerContext.hideAvatar(this.hideAvatar);
  }
}
