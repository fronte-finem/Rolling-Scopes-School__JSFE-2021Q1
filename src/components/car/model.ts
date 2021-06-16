import { REST_API } from 'services/rest-api';
import { Maybe } from 'shared/types';

import { CAR_EMPTY_COLOR, CAR_EMPTY_ID, CAR_EMPTY_NAME, CarState } from './config';

export class CarModel {
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
      this.wins = winDTO.wins;
      this.winTime = winDTO.time;
    }
  }

  public get carDTO(): REST_API.CarDTO {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
    };
  }

  public reset(): void {
    this.id = CAR_EMPTY_ID;
    this.name = CAR_EMPTY_NAME;
    this.color = CAR_EMPTY_COLOR;
    this.position = 0;
  }

  public update({ name, color }: REST_API.CarDTO): CarModel {
    this.name = name;
    this.color = color;
    this.onUpdate?.(this);
    return this;
  }

  public updateWin({ wins, time }: REST_API.WinDTO): void {
    this.wins = wins;
    this.winTime = time;
    this.onUpdate?.(this);
    this.onUpdateWin?.(this);
  }

  public driveStart(duration: number): CarModel {
    this.state = CarState.START;
    this.duration = duration;
    this.onDrive?.(this);
    return this;
  }

  public driveDead(): CarModel {
    this.state = CarState.BROKEN;
    this.onDrive?.(this);
    return this;
  }

  public driveFinish(): CarModel {
    this.state = CarState.FINISH;
    this.onDrive?.(this);
    return this;
  }

  public driveReset(): CarModel {
    this.state = CarState.INITIAL;
    this.position = 0;
    this.onDrive?.(this);
    return this;
  }

  public driveMove(): CarModel {
    if (!this.duration) return this;
    this.state = CarState.DRIVE;
    this.onDrive?.(this);
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
      this.onDrive?.(this);
    };
    window.requestAnimationFrame(step);
  }

  public onUpdate?: (model: CarModel) => void;

  public onUpdateWin?: (model: CarModel) => void;

  public onDrive?: (model: CarModel) => void;
}
