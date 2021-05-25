export enum AppState {
  INITIAL = 'initial',
  READY = 'ready',
  GAME = 'game',
  SOLVED = 'solved',
};

export interface IAppStateChangeRequest {
  from: AppState;
  to: AppState;
}

export interface IAppStateService {
  requestStateChange(request: IAppStateChangeRequest): Promise<boolean>;
}

export type AppStateChangeRequestListener = (
  request: IAppStateChangeRequest
) => Promise<boolean>;

export class ProxyAppStateService implements IAppStateService {
  private requestListener!: AppStateChangeRequestListener;

  init(requestListener: AppStateChangeRequestListener): void {
    this.requestListener = requestListener;
  }

  requestStateChange(request: IAppStateChangeRequest): Promise<boolean> {
    return this.requestListener(request);
  }
}
