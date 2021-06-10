import { WinnersModel } from 'pages/winners/winners-model';
import { REST_API } from 'services/rest-api';
import { Observer } from 'shared/observer';

import { WinnersEvent } from './config';

export class WinnersService {
  private observer = new Observer<WinnersEvent>();
  private winners!: WinnersModel;

  public initWinners(winners: WinnersModel): void {
    this.winners = winners;
  }

  public onWinnersError(listener: (error: Error) => void): void {
    this.observer.addListener(WinnersEvent.WINNERS_ERROR, listener);
  }

  private noifyWinnersError(error: Error): void {
    this.observer.notify(WinnersEvent.WINNERS_ERROR, error);
  }

  public async getWinnersForPage(pageNum?: number): Promise<void> {
    const maybeCars = await REST_API.getWinners(
      pageNum || this.winners.pageNum,
      this.winners.pageLimit
    );
    if (!maybeCars) return;
    if (maybeCars instanceof Error) {
      this.noifyWinnersError(maybeCars);
      return;
    }
    const { winners, totalCount } = maybeCars;
    this.winners.pageUpdate(totalCount, pageNum || this.winners.pageNum);
    this.winners.updateWinners(winners);
  }

  public async addWinner(winner: REST_API.IWinner): Promise<void> {
    const maybeWinner = await REST_API.createWinner(winner);
    if (!maybeWinner) return;
    if (maybeWinner instanceof Error) return;
    this.winners.pageUpdate(this.winners.totalCount + 1);
    this.winners.addWinner(maybeWinner);
  }

  public async removeWinner(winner: REST_API.IWinner): Promise<void> {
    const maybeOK = await REST_API.deleteWinner(winner.id);
    if (!maybeOK) return;
    if (maybeOK instanceof Error) this.noifyWinnersError(maybeOK);
  }

  public async updateWinner(winner: REST_API.IWinner): Promise<void> {
    const { id, ...params } = winner;
    const maybeWinner = await REST_API.updateWinner(id, params);
    if (!maybeWinner) return;
    if (maybeWinner instanceof Error) {
      this.noifyWinnersError(maybeWinner);
    }
  }
}
