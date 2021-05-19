import { IContext, StateName } from '../../shared/state/types';
import { State } from '../../shared/state/state';
import { BtnView } from '../../shared/views/btn/btn';
import { LinkView } from '../../shared/views/link/link';

export type HeaderStateName = StateName<'ready' | 'game'>;

export interface IHeaderContext extends IContext<HeaderStateName> {
  btnStateSwitch: BtnView;
  avatar: LinkView;
}

export class HeaderState extends State<HeaderStateName> {
  constructor(
    readonly name: HeaderStateName,
    readonly next: HeaderStateName,
    readonly btnText: string,
    readonly hideAvatar: boolean,
  ) {
    super(name, next);
  }

  apply(headerContext: IHeaderContext): void {
    headerContext.btnStateSwitch.setText(this.btnText);
    headerContext.avatar.setCssState('hidden', this.hideAvatar);
  }
}
