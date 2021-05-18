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
    this.model.start();
    this.view.setCssState('stop', false);
    this.view.setCssState('countdown', false);
  }

  stop(): void {
    this.model.stop();
    this.view.setCssState('stop', true);
  }

  reset(): void {
    this.model.reset();
    this.view.setCssState('stop', false);
    this.view.setCssState('countdown', false);
  }

  async countdown(initialTime = 10): Promise<void> {
    this.view.setCssState('countdown', true);
    await this.model.countdown(initialTime);
  }
}
