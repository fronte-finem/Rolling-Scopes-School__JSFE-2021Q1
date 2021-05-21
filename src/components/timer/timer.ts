import { TimerModel, ITimerModelState } from './timer-model';
import { TimerView } from './timer-view';

export class Timer {
  readonly view = new TimerView();

  readonly model = new TimerModel();

  constructor() {
    this.updateView(this.model.getState());
    this.model.onStateChange((state) =>
      this.updateView(state)
    );
  }

  updateView(state: ITimerModelState): void {
    this.view.show(state.getTimeDiff());
  }

  start(): void {
    this.view.reset();
    this.model.start();
  }

  stop(): void {
    this.model.stop();
    this.view.stop();
  }

  reset(): void {
    this.model.reset();
    this.view.reset();
  }

  async countdown(initialTime = 10): Promise<void> {
    this.view.countdown();
    await this.model.countdown(initialTime);
  }
}
