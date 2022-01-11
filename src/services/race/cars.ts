import { CarModel } from 'components/car/model';
import { GarageModel } from 'pages/garage/model';
import { WinnersModel } from 'pages/winners/model';
import { generateRandomBugs, generateRandomCars } from 'services/car';
import { REST_API } from 'services/rest-api';
import { Observer } from 'shared/observer';
import { filterTry, handleTry, Maybe, safeTry, toMaybe, Try } from 'shared/types';

import { INIT_CARS_COUNT, isInitCars } from './config';

enum ServiceEvent {
  ERROR,
}

type Sort = REST_API.Sort;
type SortOrder = REST_API.SortOrder;

export class CarsService {
  private observer = new Observer<ServiceEvent>();

  public constructor(
    public readonly garageModel: GarageModel,
    public readonly winnersModel: WinnersModel
  ) {}

  public async init(): Promise<void> {
    const result = await REST_API.getCars(this.garageModel.pageNum, this.garageModel.pageLimit);
    await safeTry(result, async ({ carDTOArray, totalCount }) => {
      if (totalCount === INIT_CARS_COUNT && isInitCars(carDTOArray)) {
        const bugs = generateRandomBugs(INIT_CARS_COUNT);
        bugs.forEach((bug, i) => {
          bug.id = i + 1;
        });
        await Promise.all(bugs.map((bug) => REST_API.updateCar(bug)));
      }
    });
  }

  public async getGaragePage(pageNum?: number): Promise<void> {
    const result = await REST_API.getCars(
      pageNum || this.garageModel.pageNum,
      this.garageModel.pageLimit
    );
    handleTry(
      result,
      ({ carDTOArray, totalCount }) => {
        this.garageModel.pageUpdate(totalCount, pageNum || this.garageModel.pageNum);
        this.garageModel.updateCars(carDTOArray);
      },
      (error) => this.noifyError(error)
    );
  }

  public async getWinnersPage(pageNum?: number, sort?: Sort, order?: SortOrder): Promise<void> {
    const result = await REST_API.getWinners(
      pageNum || this.winnersModel.pageNum,
      this.winnersModel.pageLimit,
      sort,
      order
    );
    await handleTry(
      result,
      async ({ winDTOArray, totalCount }) => {
        this.winnersModel.pageUpdate(totalCount, pageNum || this.winnersModel.pageNum);
        const models = filterTry(
          await Promise.all(
            winDTOArray.map(async (winDTO) => {
              const carDTO = toMaybe(await REST_API.getCar(winDTO.id));
              return new CarModel(carDTO, winDTO);
            })
          )
        );
        this.winnersModel.updateWinners(models);
      },
      (error) => this.noifyError(error)
    );
  }

  public sortWins(order: SortOrder): Promise<void> {
    if (order === REST_API.SortOrder.INITIAL) return this.getWinnersPage();
    return this.getWinnersPage(this.winnersModel.pageNum, REST_API.Sort.WINS, order);
  }

  public sortTime(order: SortOrder): Promise<void> {
    if (order === REST_API.SortOrder.INITIAL) return this.getWinnersPage();
    return this.getWinnersPage(this.winnersModel.pageNum, REST_API.Sort.TIME, order);
  }

  public async addCar(carDTO: REST_API.CarDTO): Promise<Maybe<CarModel>> {
    const newCarDTO = toMaybe(await REST_API.createCar(carDTO));
    if (!newCarDTO) return null;
    this.garageModel.pageUpdate(this.garageModel.totalCount + 1);
    return this.garageModel.add(newCarDTO);
  }

  public async updateCar(carDTO: REST_API.CarDTO): Promise<void> {
    const carModel = this.garageModel.cars.find((car) => car.id === carDTO.id);
    if (!carModel) return;
    safeTry(await REST_API.updateCar(carDTO), (newCarDTO) => {
      carModel.update(newCarDTO);
      this.winnersModel.cars.find((c) => c.id === newCarDTO.id)?.update(newCarDTO);
    });
  }

  public async generateRandomCars(count = 100): Promise<CarModel[]> {
    const carsParams = await generateRandomCars(count);
    const cars = await Promise.all(carsParams.map((params) => this.addCar(params)));
    return cars.filter((car) => car !== null) as CarModel[];
  }

  public async generateRandomBugs(count = 100): Promise<CarModel[]> {
    const carsParams = generateRandomBugs(count);
    const cars = await Promise.all(carsParams.map((params) => this.addCar(params)));
    return cars.filter((car) => car !== null) as CarModel[];
  }

  public async removeGaragePage(): Promise<void> {
    const tasks1 = this.garageModel.cars.map((car) => REST_API.deleteCar(car.id));
    const tasks2 = this.garageModel.cars.map((car) => REST_API.deleteWinner(car.id));
    await Promise.all(tasks1);
    await this.getGaragePage();
    const results = await Promise.all(tasks2);
    if (results.find((ok: Try<boolean>) => ok === true)) await this.getWinnersPage();
  }

  public async removeCar(id: number): Promise<void> {
    await safeTry(await REST_API.deleteCar(id), async () => {
      await REST_API.deleteWinner(id);
      this.garageModel.updateCars(this.garageModel.cars.filter((car) => car.id !== id));
      this.winnersModel.updateWinners([]);
      await this.getGaragePage();
      await this.getWinnersPage();
    });
  }

  public onAddWinner?: (car: CarModel) => void;

  public async addWinner(car: CarModel): Promise<void> {
    const ok = await this.updateWinner(car);
    if (ok) return;
    const { id, time } = car;
    const winDTO = toMaybe(await REST_API.createWinner({ id, wins: 1, time }));
    if (!winDTO) return;
    this.winnersModel.pageUpdate(this.winnersModel.totalCount + 1);
    car.updateWin(winDTO);
    const maybeCar = this.winnersModel.add(car);
    if (maybeCar) this.onAddWinner?.(maybeCar);
  }

  public async updateWinner(car: CarModel): Promise<boolean> {
    const { id, time: oldTime } = car;
    let winDTO = toMaybe(await REST_API.getWinner(car.id));
    if (!winDTO) return false;
    const { wins, time: newTime } = winDTO;
    winDTO = toMaybe(
      await REST_API.updateWinner({ id, wins: wins + 1, time: Math.min(oldTime, newTime) })
    );
    if (!winDTO) return false;
    const carModel = this.winnersModel.get(id);
    if (carModel) carModel.updateWin(winDTO);
    return true;
  }

  public onError(listener: (error: Error) => void): void {
    this.observer.addListener(ServiceEvent.ERROR, listener);
  }

  private noifyError(error: Error): void {
    this.observer.notify(ServiceEvent.ERROR, error);
  }
}
