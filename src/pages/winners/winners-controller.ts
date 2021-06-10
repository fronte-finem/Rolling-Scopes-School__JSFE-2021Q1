import { RaceService, WinnersService } from 'services/race';

import { WinnersModel } from './winners-model';
import { WinnersView } from './winners-view';

export class WinnersController {
  public readonly model = new WinnersModel();
  public readonly view = new WinnersView();

  public constructor(
    private readonly winnersService: WinnersService,
    private readonly raceService: RaceService
  ) {
    this.initBinds();
  }

  public init(): Promise<void> {
    this.view.update(this.model);
    this.winnersService.initWinners(this.model);
    this.raceService.initWinners(this.model);
    return this.winnersService.getWinnersForPage();
  }

  private initBinds(): void {
    this.winnersService.onWinnersError((error) => this.view.handleError(error));
    this.model.onPageUpdate((page) => this.view.updatePage(page));

    this.raceService.onRaceWin(async (car) => {
      const { id, duration } = car;
      if (duration === null) return;
      await this.winnersService.addWinner({ id, wins: 1, time: duration });
    });
  }
}
