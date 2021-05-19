import { ITimeDiffFormat, timeDiffFormat } from '../../shared/date-time-utils';
import { Model, ModelState } from '../../shared/models/model';

export interface ITimerModelState extends ModelState {
  startTime: number;
  currentTime: number;
  getTimeDiff(): ITimeDiffFormat;
}
export type TimerModelEvent =
  | 'countdown-start'
  | 'countdown-end'
  | 'start'
  | 'stop';

export class TimerModel extends Model<ITimerModelState> {
  private timerId: number | undefined;

  constructor() {
    super({
      startTime: 0,
      currentTime: 0,
      getTimeDiff() {
        return timeDiffFormat(this.currentTime - this.startTime);
      },
    });
  }

  reset(initialTime = 0): void {
    window.clearInterval(this.timerId);
    this.state.startTime = 0;
    this.state.currentTime = initialTime;
  }

  stop(): ITimeDiffFormat {
    window.clearInterval(this.timerId);
    return this.getTimeDiff();
  }

  start(initialTime = 0): void {
    this.reset(initialTime);
    this.timerId = window.setInterval(() => this.increment(), 1000);
  }

  async countdown(initialTime = 10): Promise<void> {
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

  getTimeDiff(): ITimeDiffFormat {
    return timeDiffFormat(this.state.currentTime - this.state.startTime);
  }
}
