import { CarModel } from 'components/car/car-model';
import { GarageModel } from 'pages/garage/garage-model';
import { WinnersModel } from 'pages/winners/winners-model';
import { generateRandomCars } from 'services/car';
import { REST_API } from 'services/rest-api';
import { Observer } from 'shared/observer';
import { handleTry, Maybe, safeTry, toMaybe, Try } from 'shared/types';

import { getCarModels, getWinModels } from './utils';

enum ServiceEvent {
  ERROR,
}

export class CarsService {
  private observer = new Observer<ServiceEvent>();

  public constructor(
    public readonly garageModel: GarageModel,
    public readonly winnersModel: WinnersModel
  ) {}

  public async getGaragePage(pageNum?: number): Promise<void> {
    const result = await REST_API.getCars(
      pageNum || this.garageModel.pageNum,
      this.garageModel.pageLimit
    );
    handleTry(
      result,
      ({ carDTOArray, totalCount }) => {
        this.garageModel.pageUpdate(totalCount, pageNum || this.garageModel.pageNum);
        const models = getCarModels(carDTOArray, this.winnersModel.cars);
        this.garageModel.updateCars(models);
        return models;
      },
      (error) => this.noifyError(error)
    );
  }

  public async getWinnersPage(pageNum?: number): Promise<void> {
    const result = await REST_API.getWinners(
      pageNum || this.winnersModel.pageNum,
      this.winnersModel.pageLimit
    );
    await handleTry(
      result,
      async ({ winDTOArray, totalCount }) => {
        this.winnersModel.pageUpdate(totalCount, pageNum || this.winnersModel.pageNum);
        const models = await getWinModels(winDTOArray, this.garageModel.cars);
        this.winnersModel.updateWinners(models);
      },
      (error) => this.noifyError(error)
    );
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
    safeTry(await REST_API.updateCar(carDTO), (newCarDTO) => carModel.update(newCarDTO));
  }

  public async generateRandomCars(count = 100): Promise<void> {
    const carsParams = await generateRandomCars(count);
    await Promise.all(carsParams.map((params) => this.addCar(params)));
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
      this.garageModel.cars.forEach((car) => car.resetBinds());
      this.garageModel.updateCars(this.garageModel.cars.filter((car) => car.id !== id));
      this.winnersModel.cars.forEach((w) => w.resetBinds());
      this.winnersModel.updateWinners([]);
      await this.getGaragePage();
      await this.getWinnersPage();
    });
  }

  private async removeWinner(id: number): Promise<void> {
    await safeTry(await REST_API.deleteWinner(id), async (ok) => {
      if (ok) await this.getWinnersPage();
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
