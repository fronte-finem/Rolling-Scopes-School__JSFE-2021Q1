import { REST_API } from 'services/rest-api';
import { createElement } from 'shared/dom-utils';
import { View } from 'shared/view';

import { WinnersHeaderName } from './config';
import styles from './style.module.scss';
import { orderGenerator, toggleOrder } from './utils';

export class WinnersHeaderView extends View<'tr'> {
  private num = createElement([styles.cell, styles.num], { tag: 'th' });
  private car = createElement([styles.cell, styles.car], { tag: 'th' });
  private name = createElement([styles.cell, styles.name], { tag: 'th' });
  private wins = createElement([styles.cell, styles.wins, styles.order], { tag: 'th' });
  private time = createElement([styles.cell, styles.time, styles.order], { tag: 'th' });

  private winsOrderGenerator = orderGenerator();
  private timeOrderGenerator = orderGenerator();

  private winsOrder = this.winsOrderGenerator.next().value;
  private timeOrder = this.timeOrderGenerator.next().value;

  public onRequesSortWins?: (order: REST_API.SortOrder) => void;
  public onRequesSortTime?: (order: REST_API.SortOrder) => void;

  public constructor() {
    super(styles.row, { tag: 'tr' });
    this.init();
  }

  protected init(): void {
    this.num.textContent = WinnersHeaderName.NUM;
    this.car.textContent = WinnersHeaderName.CAR;
    this.name.textContent = WinnersHeaderName.NAME;
    this.wins.textContent = WinnersHeaderName.WINS;
    this.time.textContent = WinnersHeaderName.TIME;
    this.root.append(this.num, this.car, this.name, this.wins, this.time);
    this.wins.onclick = () => this.requestSortWins();
    this.time.onclick = () => this.requestSortTime();
  }

  private requestSortWins() {
    this.winsOrder = toggleOrder(this.wins, this.winsOrderGenerator);
    while (this.timeOrder !== REST_API.SortOrder.INITIAL) {
      this.timeOrder = toggleOrder(this.time, this.timeOrderGenerator);
    }
    this.onRequesSortWins?.(this.winsOrder);
  }

  private requestSortTime() {
    this.timeOrder = toggleOrder(this.time, this.timeOrderGenerator);
    while (this.winsOrder !== REST_API.SortOrder.INITIAL) {
      this.winsOrder = toggleOrder(this.wins, this.winsOrderGenerator);
    }
    this.onRequesSortTime?.(this.timeOrder);
  }
}
