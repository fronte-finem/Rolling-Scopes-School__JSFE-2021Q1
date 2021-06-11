import { REST_API } from 'services/rest-api';
import { Observer } from 'shared/observer';
import { Maybe } from 'shared/types';

import { CAR_EMPTY_COLOR, CAR_EMPTY_ID, CAR_EMPTY_NAME, CarEvent, CarState } from './car-congfig';

export class CarModel {
  private observer = new Observer<CarEvent>();
  public id = CAR_EMPTY_ID;
  public name = CAR_EMPTY_NAME;
  public color = CAR_EMPTY_COLOR;
  public state = CarState.INITIAL;
  public position = 0;
  public wins = 0;
  public winTime = NaN;

  public duration: Maybe<number> = null;

  public get time(): number {
    return Number(((this.duration || NaN) / 1000).toFixed(2));
  }

  public constructor(carDTO: Maybe<REST_API.CarDTO>, winDTO: Maybe<REST_API.WinDTO>) {
    if (carDTO) {
      this.id = carDTO.id;
      this.name = carDTO.name;
      this.color = carDTO.color;
    }
    if (winDTO) {
      this.wins = winDTO.id;
      this.winTime = winDTO.time;
    }
  }

  public reset(): void {
    this.observer.reset();
    this.id = CAR_EMPTY_ID;
    this.name = CAR_EMPTY_NAME;
    this.color = CAR_EMPTY_COLOR;
    this.position = 0;
  }

  public update({ name, color }: REST_API.CarDTO): CarModel {
    this.name = name;
    this.color = color;
    this.notifyUpdate();
    return this;
  }

  public updateWin({ wins, time }: REST_API.WinDTO): void {
    this.wins = wins;
    this.winTime = time;
    this.notifyUpdate();
  }

  public driveStart(duration: Maybe<number>): CarModel {
    this.state = CarState.START;
    this.duration = duration;
    this.notifyDrive();
    return this;
  }

  public drivePause(): CarModel {
    this.state = CarState.BROKEN;
    this.notifyDrive();
    return this;
  }

  public driveFinish(): CarModel {
    this.state = CarState.FINISH;
    this.notifyDrive();
    return this;
  }

  public driveReset(): CarModel {
    this.state = CarState.INITIAL;
    this.position = 0;
    this.notifyDrive();
    return this;
  }

  public driveMove(): CarModel {
    if (!this.duration) return this;
    this.state = CarState.DRIVE;
    this.notifyDrive();
    this.driveAnimate(this.duration);
    return this;
  }

  private driveAnimate(time: number): void {
    let startTime = -1;
    const step = (timestamp: number): void => {
      if (this.state !== CarState.DRIVE) return;
      if (startTime === -1) startTime = timestamp;
      const elapsed = timestamp - startTime;
      this.position = 100 * Math.min(elapsed / time, 1);
      if (elapsed < time) window.requestAnimationFrame(step);
      this.notifyDrive();
    };
    window.requestAnimationFrame(step);
  }

  private notifyUpdate(): void {
    this.observer.notify(CarEvent.UPDATE, this);
  }

  private notifyUpdateWin(): void {
    this.observer.notify(CarEvent.UPDATE_WIN, this);
  }

  private notifyDrive(): void {
    this.observer.notify(CarEvent.DRIVE, this);
  }

  public onUpdate(listener: (model: CarModel) => void): void {
    this.observer.addListener(CarEvent.UPDATE, listener);
  }

  public onUpdateWin(listener: (model: CarModel) => void): void {
    this.observer.addListener(CarEvent.UPDATE_WIN, listener);
  }

  public onDrive(listener: (model: CarModel) => void): void {
    this.observer.addListener(CarEvent.DRIVE, listener);
  }

  public resetBinds(): void {
    this.observer.reset();
  }
}
