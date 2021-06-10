import { PageModel } from 'pages/base-page';
import { REST_API } from 'services/rest-api';
import { Observer } from 'shared/observer';

import { WinnersModelEvent } from './winners-config';

// 1.3 (+5)  "Winners" view should contain its name, page number, and the full amount of items in the database (how many records the winners table contains).
// 5.1 (+10) After some car wins it should be displayed at the "Winners view" table.
// 5.2 (+5)  There should be pagination (10 winners per one page).
// 5.3 (+10) Table should include the next culumns:
//           - "№", "Image of the car", "Name of the car", "Wins number", "Best time in seconds" (names of the columns can differ).
//           - If the same car wins more than once the number of wins should be incremented while best time should be saved only if it's better than the stored one.
// 5.4 (+10) User should be able to sort cars by wins number and by best time (ASC, DESC).

export class WinnersModel extends PageModel {
  private observer = new Observer<WinnersModelEvent>();
  public winners = new Array<REST_API.IWinner>();

  public constructor() {
    super(REST_API.WINNERS_PAGE_LIMIT_DEFAULT);
  }

  public updateWinners(winners: Array<REST_API.IWinner>): void {
    console.log(winners);
    this.winners = winners;
    this.observer.notify(WinnersModelEvent.UPDATE, winners);
  }

  public onWinnersUpdate(listener: (winners: Array<REST_API.IWinner>) => void): void {
    this.observer.addListener(WinnersModelEvent.UPDATE, listener);
  }

  public addWinner(winner: REST_API.IWinner): void {
    console.log(winner);
    if (this.winners.length >= this.pageLimit) return;
    this.winners.push(winner);
    this.observer.notify(WinnersModelEvent.ADD, winner);
  }

  public onWinnerAdd(listener: (winner: REST_API.IWinner) => void): void {
    this.observer.addListener(WinnersModelEvent.ADD, listener);
  }

  public removeWinner(winner: REST_API.IWinner): void {
    this.winners = this.winners.filter((w) => w !== winner);
    this.observer.notify(WinnersModelEvent.REMOVE, winner);
  }

  public onWinnerRemove(listener: (winner: REST_API.IWinner) => void): void {
    this.observer.addListener(WinnersModelEvent.REMOVE, listener);
  }
}
