import { CarModel } from 'components/car';
import { PageModel } from 'pages/base-page/model';
import { REST_API } from 'services/rest-api';
import { Maybe } from 'shared/types';

export class GarageModel extends PageModel {
  public cars = new Array<CarModel>();
  public onCarsUpdate?: (cars: CarModel[]) => void;

  public constructor() {
    super(REST_API.GARAGE_PAGE_LIMIT_DEFAULT);
  }

  public updateCars(carDTOArray: REST_API.CarDTO[]): void {
    this.cars = carDTOArray.map((carDTO) => new CarModel(carDTO, null));
    this.onCarsUpdate?.(this.cars);
  }

  public add(carDTO: REST_API.CarDTO): Maybe<CarModel> {
    if (this.cars.length >= this.pageLimit) return null;
    const car = new CarModel(carDTO, null);
    this.cars.push(car);
    return car;
  }

  public remove(car: CarModel): void {
    this.cars = this.cars.filter((c) => c !== car);
  }
}
