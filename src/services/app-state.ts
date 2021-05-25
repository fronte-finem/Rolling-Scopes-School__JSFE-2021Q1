import { StateName } from '../shared/state/types';

export type AppStateName = StateName<'ready' | 'game' | 'solved'>;

export interface IAppStateChangeRequest {
  from: AppStateName;
  to: AppStateName;
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
