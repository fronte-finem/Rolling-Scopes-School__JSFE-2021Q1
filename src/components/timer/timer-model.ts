import { Model, ModelState } from 'shared/models/model';

export interface ITimerModelState extends ModelState {
  startTime: number;
  currentTime: number;
}
export type TimerModelEvent =
  | 'countdown-start'
  | 'countdown-end'
  | 'start'
  | 'stop';

export class TimerModel extends Model<ITimerModelState> {
  private timerId: number | undefined;

  public constructor() {
    super({
      startTime: 0,
      currentTime: 0,
    });
  }

  public reset(initialTime = 0): void {
    window.clearInterval(this.timerId);
    this.state.startTime = 0;
    this.state.currentTime = initialTime;
  }

  public stop(): number {
    window.clearInterval(this.timerId);
    return this.diff;
  }

  public start(initialTime = 0): void {
    this.reset(initialTime);
    this.timerId = window.setInterval(() => this.increment(), 1000);
  }

  public async countdown(initialTime = 10): Promise<void> {
    return new Promise((resolve) => {
      this.reset(initialTime);
      this.timerId = window.setInterval(() => {
        this.decrement();
        if (this.state.currentTime > 0) return;
        this.reset();
        resolve();
      }, 1000);
    });
  }

  private increment(): void {
    this.state.currentTime += 1;
  }

  private decrement(): void {
    this.state.currentTime -= 1;
  }

  public get diff(): number {
    return this.state.currentTime - this.state.startTime;
  }
}
