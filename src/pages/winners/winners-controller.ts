import { CarsService, RaceService } from 'services/race';

import { WinnersModel } from './winners-model';
import { WinnersView } from './winners-view';

export class WinnersController {
  public readonly view: WinnersView;

  public constructor(
    public readonly model: WinnersModel,
    private readonly carsService: CarsService,
    private readonly raceService: RaceService
  ) {
    this.view = new WinnersView(model);
    this.initBinds();
  }

  public init(): Promise<void> {
    return this.carsService.getWinnersPage();
  }

  private initBinds(): void {
    this.carsService.onError((error) => this.view.handleError(error));
    this.model.onPageUpdate((page) => this.view.updatePage(page));
    this.model.onWinnersUpdate = (cars) => this.view.updateWinners(cars);

    this.raceService.onRaceWin((car) => this.carsService.addWinner(car));
    this.carsService.onAddWinner = (car) => this.view.add(car);
  }
}
