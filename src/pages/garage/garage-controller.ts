import { IRaceService } from 'services/race/types';

import { GarageModel } from './garage-model';
import { GarageView } from './garage-view';

export class GarageController {
  public readonly model = new GarageModel();
  public readonly view = new GarageView();

  public constructor(private readonly raceService: IRaceService) {
    this.initBinds();
  }

  private initBinds(): void {
    this.view.onRequestGaragePage((num) => this.raceService.getCarsForPage(num));
    this.raceService.onCarsUpdate((maybeModel) => this.view.updateGaragePage(maybeModel));

    this.view.onRequestGenerateCars((count) => this.raceService.generateRandomCars(count));

    this.view.onRequestCreateCar((model) => this.raceService.addCar(model));
    this.view.onRequestRemoveCar((id) => this.raceService.delCar(id));
    this.view.onRequestUpdateCar((model) => this.raceService.updateCar(model.id, model));

    this.view.onRequestStartCar = (id) => this.raceService.startCar(id);
    this.view.onRequestStopCar = (id) => this.raceService.stopCar(id);
    this.view.onRequestDriveCar = (id) => this.raceService.driveCar(id);
  }

  public async init(): Promise<void> {
    this.view.update(this.model);
    await this.raceService.init(this.model);
    return this.view.requestGaragePage(1);
  }
}
