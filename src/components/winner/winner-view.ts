import { CarModel } from 'components/car';
import { createElement } from 'shared/dom-utils';
import { Maybe } from 'shared/types';
import { View } from 'shared/view';

import { WINNER_CSS_CLASS } from './winner.css';
import { WinnerViewState } from './winner-config';

export class WinnerView extends View<'tr'> {
  private num = createElement(WINNER_CSS_CLASS.num, { tag: 'td' });
  private car = createElement(WINNER_CSS_CLASS.car, { tag: 'td' });
  private name = createElement(WINNER_CSS_CLASS.name, { tag: 'td' });
  private wins = createElement(WINNER_CSS_CLASS.wins, { tag: 'td' });
  private time = createElement(WINNER_CSS_CLASS.time, { tag: 'td' });
  public state = WinnerViewState.EMPTY;

  public get isEmpty(): boolean {
    return this.state === WinnerViewState.EMPTY;
  }

  public constructor(num: number, model: Maybe<CarModel> = null) {
    super(WINNER_CSS_CLASS.root, { tag: 'tr' });
    this.init(num);
    if (model) this.update(model);
  }

  protected init(num: number): void {
    this.reset();
    this.num.textContent = num.toString();
    this.root.append(this.num, this.car, this.name, this.wins, this.time);
  }

  public update(model?: CarModel): void {
    if (!model) {
      this.reset();
      return;
    }
    const { name, color, wins, winTime } = model;
    this.state = WinnerViewState.RECORD;
    this.car.style.backgroundColor = color;
    this.name.textContent = name;
    this.wins.textContent = `${wins}`;
    this.time.textContent = `${winTime}`;
    model.onUpdate((m) => this.update(m));
  }

  public reset(): void {
    this.state = WinnerViewState.EMPTY;
    this.car.style.backgroundColor = '';
    this.name.textContent = '';
    this.wins.textContent = '';
    this.time.textContent = '';
  }
}
