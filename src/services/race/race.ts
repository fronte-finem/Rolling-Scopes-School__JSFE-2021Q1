import { CarModel } from 'components/car';
import { GarageModel } from 'pages/garage/garage-model';
import { REST_API } from 'services/rest-api';
import { getRandomColor } from 'shared/css-utils';
import { Observer } from 'shared/observer';
import { Try } from 'shared/types';

import { CarBrand, getDataset, getRandomCarName } from './car-models';
import { IRaceService, RaceEvent } from './types';

export class RaceService implements IRaceService {
  private observer = new Observer<RaceEvent>();
  private race = new Map<number, AbortController>();
  private garage!: GarageModel;

  private carBrands!: CarBrand[];

  public constructor(private pageLimit = REST_API.GARAGE_PAGE_LIMIT_DEFAULT) {}

  public async init(garage: GarageModel): Promise<void> {
    this.garage = garage;
    this.carBrands = await getDataset();
  }

  private notifyGarageUpdate(model: Try<GarageModel>): void {
    this.observer.notify(RaceEvent.CARS_UPDATE, model);
  }

  public onCarsUpdate(listener: (model: Try<GarageModel>) => void): void {
    this.observer.addListener(RaceEvent.CARS_UPDATE, listener);
  }

  public async getCarsForPage(pageNum?: number): Promise<void> {
    if (pageNum) this.garage.pageNum = pageNum;
    const maybeCars = await REST_API.getCars(this.garage.pageNum, this.pageLimit);
    if (!maybeCars || maybeCars instanceof Error) {
      this.notifyGarageUpdate(maybeCars);
      return;
    }
    const { cars, totalCount } = maybeCars;
    this.garage.totalCount = totalCount;
    this.garage.cars = cars.map(({ id, name, color }) => new CarModel(id, name, color));
    this.notifyGarageUpdate(this.garage);
  }

  public async addCar({ name, color }: CarModel): Promise<void> {
    const result = await REST_API.createCar({ name, color });
    if (result) {
      await this.getCarsForPage();
    }
  }

  public async delCar(id: number): Promise<void> {
    const success = await REST_API.deleteCar(id);
    if (success) await this.getCarsForPage();
  }

  public async updateCar(id: number, { name, color }: CarModel): Promise<void> {
    const result = await REST_API.updateCar(id, { name, color });
    if (result) await this.getCarsForPage();
  }

  public generateRandomCarParam(): CarModel {
    return new CarModel(-1, getRandomCarName(this.carBrands), getRandomColor());
  }

  public async generateRandomCars(count = 100): Promise<void> {
    const params = Array.from({ length: count }, () => this.generateRandomCarParam());
    await Promise.all(params.map((p) => this.addCar(p)));
    await this.getCarsForPage();
  }

  public async startCar(id: number): Promise<Try<REST_API.IDriveParams>> {
    if (this.race.has(id)) return null;
    const params = await REST_API.startEngine(id);
    this.race.set(id, new AbortController());
    return params;
  }

  public async stopCar(id: number): Promise<Try<REST_API.IDriveParams>> {
    if (!this.race.has(id)) return null;
    const controller = this.race.get(id) as AbortController;
    controller.abort();
    this.race.delete(id);
    const params = await REST_API.stopEngine(id);
    return params;
  }

  public async driveCar(id: number): Promise<Try<REST_API.IDriveResult>> {
    if (!this.race.has(id)) return null;
    const controller = this.race.get(id) as AbortController;
    const params = await REST_API.driveEngine(id, controller.signal);
    return params;
  }
}
