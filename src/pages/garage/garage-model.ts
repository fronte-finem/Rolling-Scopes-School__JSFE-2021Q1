import { CarModel } from 'components/car';
import { PageModel } from 'pages/base-page/page-model';
import { REST_API } from 'services/rest-api';
import { Observer } from 'shared/observer';

import { GarageModelEvent } from './garage-config';

export class GarageModel extends PageModel {
  private observer = new Observer<GarageModelEvent>();
  public cars = new Array<CarModel>();

  public constructor() {
    super(REST_API.GARAGE_PAGE_LIMIT_DEFAULT);
  }

  public updateCars(cars: Array<REST_API.ICar>): void {
    this.cars = cars.map((car) => new CarModel(car));
    this.observer.notify(GarageModelEvent.UPDATE, this.cars);
  }

  public onCarsUpdate(listener: (cars: CarModel[]) => void): void {
    this.observer.addListener(GarageModelEvent.UPDATE, listener);
  }

  public addCar(params: REST_API.ICar): void {
    if (this.cars.length >= this.pageLimit) return;
    const car = new CarModel(params);
    this.cars.push(car);
    this.observer.notify(GarageModelEvent.ADD, car);
  }

  public onCarAdd(listener: (car: CarModel) => void): void {
    this.observer.addListener(GarageModelEvent.ADD, listener);
  }

  public removeCar(car: CarModel): void {
    this.cars = this.cars.filter((c) => c !== car);
    this.observer.notify(GarageModelEvent.REMOVE, car);
  }

  public onCarRemove(listener: (car: CarModel) => void): void {
    this.observer.addListener(GarageModelEvent.REMOVE, listener);
  }
}
