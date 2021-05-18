import { ITimeDiffFormat } from '../../shared/date-time-utils';
import { View } from '../../shared/views/view';
import { Factory } from '../../shared/views/view-factory';
import style from './timer-view.scss';

export class TimerView extends View {
  private readonly output = {
    seconds: Factory.view({
      styles: [style.timerOutput, style.timerOutputSeconds],
    }),
    minutes: Factory.view({
      styles: [style.timerOutput, style.timerOutputMinutes],
    }),
    hours: Factory.view({
      styles: [style.timerOutput, style.timerOutputHours],
    }),
  };

  constructor(splitter = ':') {
    super({
      styles: [style.timer],
      stateStyle: [
        ['stop', style.timerStop],
        ['countdown', style.timerCountdown],
      ],
    });

    this.render(
      Factory.view({
        styles: [style.timerBox],
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
    return Factory.view({
      styles: [style.timerOutput, style.timerOutputSplitter],
      text: splitter,
    });
  }
}
