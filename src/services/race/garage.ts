import { CarModel } from 'components/car';
import { GarageModel } from 'pages/garage/garage-model';
import { generateRandomCars } from 'services/car';
import { REST_API } from 'services/rest-api';
import { Observer } from 'shared/observer';

import { GarageEvent } from './config';

export class GarageService {
  private observer = new Observer<GarageEvent>();
  private garage!: GarageModel;

  public initGarage(garage: GarageModel): void {
    this.garage = garage;
  }

  public onError(listener: (error: Error) => void): void {
    this.observer.addListener(GarageEvent.GARAGE_ERROR, listener);
  }

  private noifyGarageError(error: Error): void {
    this.observer.notify(GarageEvent.GARAGE_ERROR, error);
  }

  public async getCarsForPage(pageNum?: number): Promise<void> {
    const maybeCars = await REST_API.getCars(pageNum || this.garage.pageNum, this.garage.pageLimit);
    if (!maybeCars) return;
    if (maybeCars instanceof Error) {
      this.noifyGarageError(maybeCars);
      return;
    }
    const { cars, totalCount } = maybeCars;
    this.garage.pageUpdate(totalCount, pageNum || this.garage.pageNum);
    this.garage.updateCars(cars);
  }

  public async addCar({ name, color }: REST_API.ICarParams): Promise<void> {
    const maybeCar = await REST_API.createCar({ name, color });
    if (!maybeCar) return;
    if (maybeCar instanceof Error) return;
    this.garage.pageUpdate(this.garage.totalCount + 1);
    this.garage.addCar(maybeCar);
  }

  public async generateRandomCars(count = 100): Promise<void> {
    const carsParams = await generateRandomCars(count);
    await Promise.all(carsParams.map((params) => this.addCar(params)));
  }

  public async removeCar(car: CarModel): Promise<void> {
    const maybeOK = await REST_API.deleteCar(car.id);
    if (!maybeOK) return;
    if (maybeOK instanceof Error) this.noifyGarageError(maybeOK);
  }

  public async updateCar(car: CarModel): Promise<void> {
    const { id, name, color } = car;
    const maybeCar = await REST_API.updateCar(id, { name, color });
    if (!maybeCar) return;
    if (maybeCar instanceof Error) {
      this.noifyGarageError(maybeCar);
      return;
    }
    car.update(maybeCar.name, maybeCar.color);
  }
}
