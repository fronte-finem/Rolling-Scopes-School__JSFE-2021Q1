import { PageView } from 'pages/base-page';
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

export class WinnersView extends PageView<WinnersModel> {
  private observer = new Observer<WinnersViewEvent>();

  public constructor() {
    super(WINNERS, WINNERS_CSS_CLASS.winners);
    this.init();
  }

  protected init(): void {
    this.getRoot();
  }

  public handleError(error: Error): void {
    this.popup?.update(`${error.name}: ${error.message}`);
  }

  public update(model: WinnersModel): void {
    this.updatePage(model);
  }
}
