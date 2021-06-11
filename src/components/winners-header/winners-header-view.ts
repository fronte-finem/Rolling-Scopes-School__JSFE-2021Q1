import { createElement } from 'shared/dom-utils';
import { View } from 'shared/view';

import { WINNER_CSS_CLASS } from './winners-header.css';
import { WinnersHeaderName } from './winners-header-config';

export class WinnersHeaderView extends View<'tr'> {
  private num = createElement(WINNER_CSS_CLASS.num, { tag: 'th' });
  private car = createElement(WINNER_CSS_CLASS.car, { tag: 'th' });
  private name = createElement(WINNER_CSS_CLASS.name, { tag: 'th' });
  private wins = createElement(WINNER_CSS_CLASS.wins, { tag: 'th' });
  private time = createElement(WINNER_CSS_CLASS.time, { tag: 'th' });

  public constructor() {
    super(WINNER_CSS_CLASS.root, { tag: 'tr' });
    this.init();
  }

  protected init(): void {
    this.num.textContent = WinnersHeaderName.NUM;
    this.car.textContent = WinnersHeaderName.CAR;
    this.name.textContent = WinnersHeaderName.NAME;
    this.wins.textContent = WinnersHeaderName.WINS;
    this.time.textContent = WinnersHeaderName.TIME;
    this.root.append(this.num, this.car, this.name, this.wins, this.time);
  }
}
