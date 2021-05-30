import { ITimeDiffFormat } from '../../shared/date-time-utils';
import { View } from '../../shared/views/view';

import styles from './timer-view.scss';

const createSplitter = (splitter = ':'): View =>
  new View({
    classNames: [styles.timerOutput, styles.timerOutputSplitter],
    text: splitter,
  });

export class TimerView extends View {
  private readonly output = {
    seconds: new View({
      classNames: [styles.timerOutput, styles.timerOutputSeconds],
    }),
    minutes: new View({
      classNames: [styles.timerOutput, styles.timerOutputMinutes],
    }),
    hours: new View({
      classNames: [styles.timerOutput, styles.timerOutputHours],
    }),
  };

  public constructor() {
    super({ classNames: [styles.timer] });
    this.init();
  }

  private init(splitter = ':') {
    const wrapper = new View({ classNames: [styles.timerBox] });
    wrapper.render([
      this.output.hours,
      createSplitter(splitter),
      this.output.minutes,
      createSplitter(splitter),
      this.output.seconds,
    ]);
    this.render(wrapper);
  }

  public show(time: ITimeDiffFormat): void {
    this.output.seconds.element.textContent = time.sec;
    this.output.minutes.element.textContent = time.min;
    if (time.hours) {
      this.output.hours.element.textContent = time.hours;
    }
  }

  public stop(stop = true): void {
    this.setCssState(styles.timerStop, stop);
  }

  public countdown(countdown = true): void {
    this.setCssState(styles.timerCountdown, countdown);
  }

  public reset(): void {
    this.stop(false);
    this.countdown(false);
  }
}
