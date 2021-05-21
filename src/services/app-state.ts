import { StateName } from "../shared/state/types";

export type AppStateName = StateName<'ready' | 'game'>;

export interface IAppStateService {
  requestStateChange(from: AppStateName): Promise<boolean>;
}

// export class DumbAppStateService implements IAppStateService {
//   requestStateChange(fromState: AppStateName): Promise<boolean> {
//     console.log(fromState, this);
//     return new Promise((resolve) => resolve(true));
//   }
// }

type AppStateChangeRequestListener = (fromState: AppStateName) => Promise<boolean>;

export class ProxyAppStateService implements IAppStateService {
  constructor(private readonly requestListener: AppStateChangeRequestListener) {}

  requestStateChange(fromState: AppStateName): Promise<boolean> {
    return this.requestListener(fromState);
  }
}
