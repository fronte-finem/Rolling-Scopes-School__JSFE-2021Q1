import { StateName, IState, IContext } from './types';

export abstract class State<SpecificStateNames>
  implements IState<SpecificStateNames>
{
  constructor(
    readonly name: StateName<SpecificStateNames>,
    readonly next: StateName<SpecificStateNames>
  ) {}

  apply(context: IContext<SpecificStateNames>): void {
    throw new Error(
      `⚠️ Method not implemented. This state: ${String(
        this.name
      )}. This context: ${String(context)} ⚠️`
    );
  }
}
