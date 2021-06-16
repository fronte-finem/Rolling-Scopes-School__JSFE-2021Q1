import { CarModel } from 'components/car';
import { PopupView } from 'components/popup';
import { WinnerView } from 'components/winner';
import { WinnersHeaderView } from 'components/winners-header';
import { PageView } from 'pages/base-page';
import { REST_API } from 'services/rest-api';
import { createElement } from 'shared/dom-utils';

import { WINNERS } from './config';
import { WinnersModel } from './model';
import styles from './style.module.scss';

// 1.3 (+5)  "Winners" view should contain its name, page number, and the full amount of items in the database (how many records the winners table contains).
// 5.1 (+10) After some car wins it should be displayed at the "Winners view" table.
// 5.2 (+5)  There should be pagination (10 winners per one page).
// 5.3 (+10) Table should include the next culumns:
//           - "№", "Image of the car", "Name of the car", "Wins number", "Best time in seconds" (names of the columns can differ).
//           - If the same car wins more than once the number of wins should be incremented while best time should be saved only if it's better than the stored one.
// 5.4 (+10) User should be able to sort cars by wins number and by best time (ASC, DESC).

const LIMIT = REST_API.WINNERS_PAGE_LIMIT_DEFAULT;

export class WinnersView extends PageView {
  private table = createElement(styles.table, { tag: 'table' });
  private thead = createElement(styles.thead, { tag: 'thead' });
  private tbody = createElement(styles.tbody, { tag: 'tbody' });
  private header = new WinnersHeaderView();
  private winnerViews: Array<WinnerView> = Array.from(
    { length: LIMIT },
    (_, i) => new WinnerView(i + 1)
  );

  public sortType = REST_API.Sort.ID;
  public sortOrder = REST_API.SortOrder.INITIAL;

  public onRequesSortWins?: (order: REST_API.SortOrder) => void;
  public onRequesSortTime?: (order: REST_API.SortOrder) => void;

  public constructor(model: WinnersModel, popup: PopupView) {
    super(model, WINNERS, styles.winners, popup);
    this.initWinners();
  }

  private initWinners(): void {
    this.thead.append(this.header.getRoot());
    this.tbody.append(...this.winnerViews.map((w) => w.getRoot()));
    this.table.append(this.thead, this.tbody);
    this.content.append(this.table);
    this.header.onRequesSortWins = (order) => this.requesSortWins(order);
    this.header.onRequesSortTime = (order) => this.requesSortTime(order);
  }

  private requesSortWins(order: REST_API.SortOrder): void {
    this.sortType = REST_API.Sort.WINS;
    this.sortOrder = order;
    this.onRequesSortWins?.(this.sortOrder);
  }

  private requesSortTime(order: REST_API.SortOrder): void {
    this.sortType = REST_API.Sort.TIME;
    this.sortOrder = order;
    this.onRequesSortTime?.(this.sortOrder);
  }

  public handleError(error: Error): void {
    this.popup.showText(error.name, error.message);
  }

  public updateWinners(car: CarModel[]): void {
    const num = this.pageModel.pageNum;
    this.winnerViews.forEach((view, i) => view.update((num - 1) * 10 + 1 + i, car[i]));
  }

  public add(car: CarModel): void {
    this.winnerViews.find((w) => w.isEmpty)?.update(null, car);
  }
}
