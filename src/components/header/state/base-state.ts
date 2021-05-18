import { HeaderView, HeaderViewEvent } from '../header-view';

export interface IHeaderState {
  headerView: HeaderView;
  update(): void;
}

type HeaderStateCostructor<T extends IHeaderState> = new (
  headerView: HeaderView
) => T;

export abstract class HeaderState implements IHeaderState {
  constructor(readonly headerView: HeaderView) {
    this.headerView = headerView;
  }

  update(): void {
    throw new Error(`⚠️ Method not implemented. Blame: ${this} ⚠️`);
  }

  protected baseUpdate<T extends HeaderState>(
    event: HeaderViewEvent,
    btnText: string,
    hideAvatar: boolean,
    NextState: HeaderStateCostructor<T>
  ): void {
    this.headerView.observer.notify(event, 123);
    this.headerView.btnStateSwitch.element.textContent = btnText;
    this.headerView.avatar.setCssState('hidden', hideAvatar);
    this.headerView.setState(new NextState(this.headerView));
  }
}
