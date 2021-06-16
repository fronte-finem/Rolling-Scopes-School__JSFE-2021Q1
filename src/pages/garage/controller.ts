import { CarsService, RaceService } from 'services/race';

import { GarageModel } from './model';
import { GarageView } from './view';

export class GarageController {
  public constructor(
    public readonly model: GarageModel,
    public readonly view: GarageView,
    private readonly carsService: CarsService,
    private readonly raceService: RaceService
  ) {
    this.initSimpleBinds();
    this.initHeavyBinds();
    this.initRaceBinds();
    this.carsService.onError((error) => this.view.handleError(error));
  }

  public async init(): Promise<void> {
    await this.carsService.init();
    await this.carsService.getGaragePage();
  }

  private initSimpleBinds(): void {
    this.model.onPageUpdate((page) => this.view.updatePage(page));
    this.model.onCarsUpdate = (cars) => this.view.updateCars(cars);
    this.view.onRequestAddCar = (carDTO) => this.carsService.addCar(carDTO);
    this.view.onRequestUpdateCar = (carDTO) => this.carsService.updateCar(carDTO);
    this.view.onRequestGenerateCars = (count) => this.carsService.generateRandomBugs(count);
  }

  private initHeavyBinds(): void {
    this.view.onRequestPage(async (num) => {
      await this.raceService.resetRace();
      await this.carsService.getGaragePage(num);
    });
    this.view.onRequestRemoveCar = async (car) => {
      await this.raceService.resetRace();
      await this.carsService.removeCar(car.id);
    };
    this.view.onRequestRemovePage = async () => {
      await this.raceService.resetRace();
      await this.carsService.removeGaragePage();
    };
  }

  private initRaceBinds(): void {
    this.view.onRequestStartCar = (car) => this.raceService.startAndDrive(car);
    this.view.onRequestStopCar = (car) => this.raceService.stop(car);
    this.view.onRequestStartRace = () => this.raceService.startRace();
    this.view.onRequestResetRace = () => this.raceService.resetRace();
    // this.raceService.onRaceWin((car) => this.view.showWinner(car));
    this.raceService.onFinish = (plcae, car) => this.view.showFinisher(plcae, car);
  }
}
