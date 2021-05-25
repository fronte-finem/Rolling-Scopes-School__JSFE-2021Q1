import { ITimeDiffFormat } from '../../shared/date-time-utils';
import { View } from '../../shared/views/view';
import styles from './timer-view.scss';

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

  constructor(splitter = ':') {
    super({ classNames: [styles.timer] });

    this.render(
      new View({
        classNames: [styles.timerBox],
        childs: [
          this.output.hours,
          TimerView.createSplitter(splitter),
          this.output.minutes,
          TimerView.createSplitter(splitter),
          this.output.seconds,
        ],
      })
    );
  }

  show(time: ITimeDiffFormat): void {
    this.output.seconds.element.textContent = time.sec;
    this.output.minutes.element.textContent = time.min;
    if (time.hours) {
      this.output.hours.element.textContent = time.hours;
    }
  }

  static createSplitter(splitter = ':'): View {
    return new View({
      classNames: [styles.timerOutput, styles.timerOutputSplitter],
      text: splitter,
    });
  }

  stop(stop = true): void {
    this.setCssState(styles.timerStop, stop);
  }

  countdown(countdown = true): void {
    this.setCssState(styles.timerCountdown, countdown);
  }

  reset(): void {
    this.stop(false);
    this.countdown(false);
  }
}
