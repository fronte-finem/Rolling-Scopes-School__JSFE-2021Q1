import HeaderView from '../header-view';

export interface IHeaderState {
  headerView: HeaderView;
  update(): void;
}

type HeaderStateCostructor<T extends IHeaderState> = new (
  headerView: HeaderView
) => T;

export default abstract class HeaderState implements IHeaderState {
  constructor(readonly headerView: HeaderView) {
    this.headerView = headerView;
  }

  update(): void {
    throw new Error(`⚠️ Method not implemented. Blame: ${this} ⚠️`);
  }

  protected baseUpdate<T extends HeaderState>(
    [signUp, start, stop, avatar]: boolean[],
    NextState: HeaderStateCostructor<T>
  ): void {
    this.headerView.btns.signUp.setCssState('hidden', signUp);
    this.headerView.btns.start.setCssState('hidden', start);
    this.headerView.btns.stop.setCssState('hidden', stop);
    this.headerView.avatar.setCssState('hidden', avatar);
    this.headerView.setState(new NextState(this.headerView));
  }
}
