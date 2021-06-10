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

  public duration: Maybe<number> = null;

  public constructor(car?: REST_API.ICar) {
    if (car) {
      this.id = car.id;
      this.name = car.name;
      this.color = car.color;
    }
  }

  public reset(): void {
    this.observer.reset();
    this.id = CAR_EMPTY_ID;
    this.name = CAR_EMPTY_NAME;
    this.color = CAR_EMPTY_COLOR;
    this.position = 0;
  }

  public onUpdate(listener: (model: CarModel) => void): void {
    this.observer.addListener(CarEvent.UPDATE, listener);
  }

  public update(name: string, color: string): CarModel {
    this.name = name;
    this.color = color;
    this.observer.notify(CarEvent.UPDATE, this);
    return this;
  }

  public onDrive(listener: (model: CarModel) => void): void {
    this.observer.addListener(CarEvent.DRIVE, listener);
  }

  public driveStart(duration: Maybe<number>): CarModel {
    this.state = CarState.START;
    this.duration = duration;
    this.observer.notify(CarEvent.DRIVE, this);
    return this;
  }

  public drivePause(): CarModel {
    this.state = CarState.BROKEN;
    this.observer.notify(CarEvent.DRIVE, this);
    return this;
  }

  public driveFinish(): CarModel {
    this.state = CarState.FINISH;
    this.observer.notify(CarEvent.DRIVE, this);
    return this;
  }

  public driveReset(): CarModel {
    this.state = CarState.INITIAL;
    this.position = 0;
    this.observer.notify(CarEvent.DRIVE, this);
    return this;
  }

  public driveMove(): CarModel {
    if (!this.duration) return this;
    this.state = CarState.DRIVE;
    this.observer.notify(CarEvent.DRIVE, this);
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
      this.observer.notify(CarEvent.DRIVE, this);
    };

    window.requestAnimationFrame(step);
  }
}
