import { GarageService, RaceService } from 'services/race';

import { GarageModel } from './garage-model';
import { GarageView } from './garage-view';

export class GarageController {
  public readonly model = new GarageModel();
  public readonly view = new GarageView();

  public constructor(
    private readonly garageService: GarageService,
    private readonly raceService: RaceService
  ) {
    this.initGarageBinds();
    this.initRaceBinds();
  }

  public init(): Promise<void> {
    this.view.update(this.model);
    this.garageService.initGarage(this.model);
    this.raceService.initGarage(this.model);
    return this.garageService.getCarsForPage();
  }

  private initGarageBinds(): void {
    this.garageService.onError((error) => this.view.handleError(error));
    this.model.onPageUpdate((page) => this.view.updatePage(page));
    this.model.onCarsUpdate((cars) => this.view.updateCars(cars));
    // this.model.onCarRemove((car) => this.view.removeCar(car));
    this.model.onCarAdd((car) => this.view.addCar(car));

    this.view.onRequestPage(async (num) => {
      this.raceService.resetRaceSync();
      await this.garageService.getCarsForPage(num);
    });
    this.view.onRequestRemoveCar(async (car) => {
      this.raceService.abortDriveCar(car);
      await this.garageService.removeCar(car);
      await this.garageService.getCarsForPage();
    });
    this.view.onRequestRemovePage(async () => {
      this.raceService.abortRace();
      const tasks = this.model.cars.map((car) => this.garageService.removeCar(car));
      await Promise.all(tasks);
      await this.garageService.getCarsForPage();
    });
    this.view.onRequestAddCar((car) => this.garageService.addCar(car));
    this.view.onRequestUpdateCar((car) => this.garageService.updateCar(car));
    this.view.onRequestGenerateCars((count) => this.garageService.generateRandomCars(count));
  }

  private initRaceBinds(): void {
    this.view.onRequestStartCar((car) => this.raceService.startAndDriveCar(car));
    this.view.onRequestStopCar((car) => this.raceService.stopCar(car));
    this.view.onRequestStartRace = () => this.raceService.startRace();
    this.view.onRequestResetRace = () => this.raceService.resetRace();

    this.raceService.onRaceWin((car) => this.view.showWinner(car));
    this.raceService.onRaceEnd((cars) => this.view.showFinishers(cars));
  }
}
