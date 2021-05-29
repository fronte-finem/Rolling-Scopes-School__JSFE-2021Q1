import { timeDiffFormat } from '../../shared/date-time-utils';

import { ITimerModelState, TimerModel } from './timer-model';
import { TimerView } from './timer-view';

export class Timer {
  public readonly view = new TimerView();

  public readonly model = new TimerModel();

  public constructor() {
    this.updateView(this.model.getState());
    this.model.onStateChange((state) => this.updateView(state));
  }

  public updateView(state: ITimerModelState): void {
    this.view.show(timeDiffFormat(state.currentTime - state.startTime));
  }

  public start(): void {
    this.view.reset();
    this.model.start();
  }

  public stop(): void {
    this.model.stop();
    this.view.stop();
  }

  public reset(): void {
    this.model.reset();
    this.view.reset();
  }

  public async countdown(initialTime = 10): Promise<void> {
    this.view.countdown();
    await this.model.countdown(initialTime);
  }
}
