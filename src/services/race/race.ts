import { CarModel } from 'components/car';
import { GarageModel } from 'pages/garage/model';
import { WinnersModel } from 'pages/winners/model';
import { REST_API } from 'services/rest-api';
import { delay } from 'shared/async-utils';
import { Observer } from 'shared/observer';
import { Maybe, toMaybe } from 'shared/types';

import { DEFAULT_LAG_TIME, DEFAULT_TIMEOUT, RaceEvent } from './config';

export class RaceService {
  private observer = new Observer<RaceEvent>();
  private race = new Map<CarModel, AbortController>();
  private raceResults: Array<CarModel> = [];
  private raceStartTime = new Date();

  public constructor(
    public readonly garageModel: GarageModel,
    public readonly winnersModel: WinnersModel
  ) {}

  public abort(car: CarModel): void {
    if (!this.race.has(car)) return;
    const controller = this.race.get(car) as AbortController;
    controller.abort();
    this.race.delete(car);
  }

  public async start(car: CarModel): Promise<void> {
    if (this.race.has(car)) return;
    car.driveStart(10 * (Math.random() + 1));
    const maybeParams = toMaybe(await REST_API.engineStart(car.id));
    if (!maybeParams) {
      car.driveReset();
      return;
    }
    const { distance, velocity } = maybeParams;
    car.driveStart(Math.ceil(distance / velocity));
    this.race.set(car, new AbortController());
  }

  public async stop(car: CarModel): Promise<void> {
    if (!this.race.has(car)) return;
    this.abort(car);
    const maybeParams = toMaybe(await REST_API.engineStop(car.id));
    if (!maybeParams) return;
    car.driveReset();
  }

  public stopSync(car: CarModel): void {
    if (!this.race.has(car)) return;
    this.abort(car);
    void REST_API.engineStop(car.id);
    car.driveReset();
  }

  public async drive(car: CarModel): Promise<Maybe<CarModel>> {
    if (!this.race.has(car)) return null;
    const controller = this.race.get(car) as AbortController;
    const timeout = delay((car.duration || DEFAULT_TIMEOUT) + DEFAULT_LAG_TIME, controller);
    const drive = REST_API.engineDrive(car.id, controller.signal);
    car.driveMove();
    const result = await Promise.race([timeout, drive]);
    if (result === null) {
      return null;
    }
    // if (result instanceof REST_API.EngineError) {
    if (result instanceof Error) {
      car.driveDead();
      return null;
    }
    if (result instanceof AbortController) {
      result.abort();
    }
    car.driveFinish();
    return car;
  }

  public async startAndDrive(car: CarModel): Promise<void> {
    await this.start(car);
    await this.drive(car);
  }

  public abortRace(): void {
    if (this.race.size === 0) return;
    this.raceResults = [];
    [...this.race.keys()].map((car) => this.abort(car));
  }

  public async resetRace(): Promise<void> {
    if (this.race.size > 0) {
      this.raceResults = [];
      await Promise.all([...this.race.keys()].map((car) => this.stop(car)));
    }
  }

  public resetRaceSync(): void {
    if (this.race.size === 0) return;
    this.raceResults = [];
    [...this.race.keys()].map((car) => this.stopSync(car));
  }

  public async startRace(): Promise<CarModel[]> {
    await this.resetRace();
    await Promise.all(this.garageModel.cars.map((car) => this.start(car)));
    const driveTasks = this.garageModel.cars.map((car) => this.drive(car));
    this.raceResults = [];
    this.raceStartTime = new Date();
    await this.doRace(driveTasks);
    return this.raceResults;
  }

  private async doRace(driveTasks: Promise<Maybe<CarModel>>[]): Promise<void> {
    if (driveTasks.length === 0) return;
    const race = driveTasks.map((p) => p.then((c) => ({ car: c, promise: p })));
    const { car, promise } = await Promise.race(race);
    if (car) {
      this.raceResults.push(car);
      const place = this.raceResults.length;
      if (place === 1) this.notifyRaceWin(car);
      this.onFinish?.(place, car);
    }
    await this.doRace(driveTasks.filter((p) => p !== promise));
  }

  public onRaceWin(listener: (winner: CarModel) => void): void {
    this.observer.addListener(RaceEvent.RACE_WIN, listener);
  }

  private notifyRaceWin(winner: CarModel): void {
    this.observer.notify(RaceEvent.RACE_WIN, winner);
  }

  public onFinish?: (place: number, car: CarModel) => void;
}
