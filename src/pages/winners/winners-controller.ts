import { IRaceService } from 'services/race/types';

import { WinnersModel } from './winners-model';
import { WinnersView } from './winners-view';

export class WinnersController {
  public readonly model = new WinnersModel();
  public readonly view = new WinnersView();

  public constructor(private readonly raceService: IRaceService) {
    this.initBinds();
  }

  private initBinds(): void {
    console.log('todo: bind WinnersView <=> IRaceService', this);
  }

  public init(): void {
    this.view.update(this.model);
    // await this.raceService.init(this.model);
  }
}
