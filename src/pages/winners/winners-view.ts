import { CarModel } from 'components/car';
import { WinnerView } from 'components/winner';
import { WinnersHeaderView } from 'components/winners-header';
import { PageView } from 'pages/base-page';
import { REST_API } from 'services/rest-api';
import { createElement } from 'shared/dom-utils';
import { Observer } from 'shared/observer';

import { WINNERS_CSS_CLASS } from './winners.css';
import { WINNERS, WinnersViewEvent } from './winners-config';
import { WinnersModel } from './winners-model';

// 1.3 (+5)  "Winners" view should contain its name, page number, and the full amount of items in the database (how many records the winners table contains).
// 5.1 (+10) After some car wins it should be displayed at the "Winners view" table.
// 5.2 (+5)  There should be pagination (10 winners per one page).
// 5.3 (+10) Table should include the next culumns:
//           - "№", "Image of the car", "Name of the car", "Wins number", "Best time in seconds" (names of the columns can differ).
//           - If the same car wins more than once the number of wins should be incremented while best time should be saved only if it's better than the stored one.
// 5.4 (+10) User should be able to sort cars by wins number and by best time (ASC, DESC).

const LIMIT = REST_API.WINNERS_PAGE_LIMIT_DEFAULT;

export class WinnersView extends PageView {
  private observer = new Observer<WinnersViewEvent>();
  private table = createElement('table', { tag: 'table' });
  private thead = createElement('thead', { tag: 'thead' });
  private tbody = createElement('tbody', { tag: 'tbody' });
  private header = new WinnersHeaderView();
  private cars: Array<WinnerView> = Array.from({ length: LIMIT }, (_, i) => new WinnerView(i + 1));

  public constructor(model: WinnersModel) {
    super(model, WINNERS, WINNERS_CSS_CLASS.winners);
    this.initWinners();
  }

  private initWinners(): void {
    this.thead.append(this.header.getRoot());
    this.tbody.append(...this.cars.map((w) => w.getRoot()));
    this.table.append(this.thead, this.tbody);
    this.content.append(this.table);
  }

  public handleError(error: Error): void {
    this.popup(`${error.name}: ${error.message}`);
  }

  public update(model: WinnersModel): void {
    this.updatePage(model);
  }

  public updateWinners(car: CarModel[]): void {
    this.cars.forEach((view, i) => view.update(car[i]));
  }

  public add(car: CarModel): void {
    this.cars.find((w) => w.isEmpty)?.update(car);
  }
}
