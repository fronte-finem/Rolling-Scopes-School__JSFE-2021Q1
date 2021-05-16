import TimerModel, { ITimerModelState } from './timer-model';
import TimerView from './timer-view';

export default class Timer {
  readonly view = new TimerView();

  readonly model = new TimerModel();

  constructor() {
    this.updateView(this.model.getState());
    this.model.onStateChange((state) => this.updateView(<ITimerModelState>state))
  }

  updateView(state: ITimerModelState): void {
    this.view.show(state.getTimeDiff());
  }

  start(): void {
    this.model.start();
    this.view.state('stop', false);
    this.view.state('countdown', false);
  }

  stop(): void {
    this.model.stop();
    this.view.state('stop', true);
  }

  countdown(initialTime = 10): void {
    this.model.countdown(initialTime);
    this.view.state('countdown', true);
  }
}
