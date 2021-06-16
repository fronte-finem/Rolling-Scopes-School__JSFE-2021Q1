import { CarsService, RaceService } from 'services/race';

import { WinnersModel } from './model';
import { WinnersView } from './view';

export class WinnersController {
  public constructor(
    public readonly model: WinnersModel,
    public readonly view: WinnersView,
    private readonly carsService: CarsService,
    private readonly raceService: RaceService
  ) {
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

    this.view.onRequestPage((num) =>
      this.carsService.getWinnersPage(num, this.view.sortType, this.view.sortOrder)
    );

    this.view.onRequesSortWins = (order) => this.carsService.sortWins(order);
    this.view.onRequesSortTime = (order) => this.carsService.sortTime(order);
  }
}
