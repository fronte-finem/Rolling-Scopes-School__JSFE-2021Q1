import { REST_API } from 'services/rest-api';

export const CAR_EMPTY_ID = -1;
export const CAR_EMPTY_NAME = '';
export const CAR_EMPTY_COLOR = '#000000';

export enum CarState {
  INITIAL = 'initial',
  DRIVE = 'race',
  BROKEN = 'broken',
}

export class CarModel implements CarModel {
  public state = CarState.INITIAL;
  public position = 0;
  private listener?: (model: CarModel) => void;

  public constructor(
    public id = CAR_EMPTY_ID,
    public name = CAR_EMPTY_NAME,
    public color = CAR_EMPTY_COLOR
  ) {}

  public onUpdate(listener: (model: CarModel) => void): void {
    this.listener = listener;
  }

  public move({ distance, velocity }: REST_API.IDriveParams): void {
    this.state = CarState.DRIVE;
    this.listener?.(this);
    this.animateMove(Math.ceil(distance / velocity));
  }

  public pause(): void {
    this.state = CarState.BROKEN;
    this.listener?.(this);
  }

  public reset(): void {
    this.state = CarState.INITIAL;
    this.position = 0;
    this.listener?.(this);
  }

  private animateMove(time: number): void {
    let startTime = -1;

    const step = (timestamp: number): void => {
      if (this.state !== CarState.DRIVE) return;
      if (startTime === -1) startTime = timestamp;
      const elapsed = timestamp - startTime;
      this.position = 100 * Math.min(elapsed / time, 1);
      if (elapsed < time) window.requestAnimationFrame(step);
      this.listener?.(this);
    };

    window.requestAnimationFrame(step);
  }
}
