import { IStateChangeRequest } from '../shared/state/state-maсhine';

export enum AppState {
  INITIAL = 'initial',
  READY = 'ready',
  GAME = 'game',
  SOLVED = 'solved',
}

export interface IAppStateService {
  requestStateChange(request: IStateChangeRequest<AppState>): Promise<boolean>;
}

export type AppStateChangeRequestListener = (
  request: IStateChangeRequest<AppState>
) => Promise<boolean>;

export class ProxyAppStateService implements IAppStateService {
  private requestListener!: AppStateChangeRequestListener;

  public init(requestListener: AppStateChangeRequestListener): void {
    this.requestListener = requestListener;
  }

  public requestStateChange(
    request: IStateChangeRequest<AppState>
  ): Promise<boolean> {
    return this.requestListener(request);
  }
}
