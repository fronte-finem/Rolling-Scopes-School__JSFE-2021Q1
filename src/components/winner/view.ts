import { CarModel, CarView } from 'components/car';
import { createElement } from 'shared/dom-utils';
import { Maybe } from 'shared/types';
import { View } from 'shared/view';

import { WinnerViewState } from './config';
import styles from './style.module.scss';

export class WinnerView extends View<'tr'> {
  private num = createElement([styles.cell, styles.num], { tag: 'td' });
  private car = createElement([styles.cell, styles.car], { tag: 'td' });
  private name = createElement([styles.cell, styles.name], { tag: 'td' });
  private wins = createElement([styles.cell, styles.wins], { tag: 'td' });
  private time = createElement([styles.cell, styles.time], { tag: 'td' });
  public state = WinnerViewState.EMPTY;
  private carView = new CarView(null, true, [styles.smallBug]);

  public get isEmpty(): boolean {
    return this.state === WinnerViewState.EMPTY;
  }

  public constructor(num: number, model: Maybe<CarModel> = null) {
    super([styles.row], { tag: 'tr' });
    this.build();
    if (model) this.update(num, model);
  }

  protected build(): void {
    this.car.append(this.carView.getRoot());
    this.root.append(this.num, this.car, this.name, this.wins, this.time);
    this.reset();
  }

  public update(num: Maybe<number> | null, model?: CarModel): void {
    if (num) this.num.textContent = num.toString();
    if (!model) {
      this.reset();
      return;
    }
    const { name, wins, winTime } = model;
    this.state = WinnerViewState.RECORD;
    this.carView.applayDTO(model.carDTO);
    this.car.classList.remove(styles.hidden);
    this.name.textContent = name;
    this.wins.textContent = `${wins}`;
    this.time.textContent = `${winTime}`;
    model.onUpdate = (m) => this.update(num, m);
  }

  public reset(): void {
    this.state = WinnerViewState.EMPTY;
    this.car.style.backgroundColor = '';
    this.name.textContent = '';
    this.wins.textContent = '';
    this.time.textContent = '';
    this.car.classList.add(styles.hidden);
  }
}
