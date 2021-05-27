import { Model, ModelState } from '../../shared/models/model';
import { CardModel } from '../../components/card/card-model';
import { Listener, Observer } from '../../shared/observer';
import { GameMatches } from '../../services/game-service';

export interface IGameModelState extends ModelState {
  isError: boolean;
  isStopped: boolean;
  isSolved: boolean;
  gameActiveCard?: CardModel;
  matchedCards: Set<CardModel>;
}

type GameEvents = 'game-solved' | 'game-error';

export class GameModel extends Model<IGameModelState> {
  private gameObserver = new Observer<GameEvents>();

  public constructor(private readonly cards: CardModel[]) {
    super({
      isError: false,
      isStopped: true,
      isSolved: false,
      gameActiveCard: undefined,
      matchedCards: new Set<CardModel>(),
    });
    this.cards = cards;
  }

  public flipAll(toFront: boolean): void {
    this.cards.forEach((card) => card.flip(toFront));
  }

  public onSolved(listener: Listener<IGameModelState>): void {
    this.gameObserver.subscribe('game-solved', listener);
  }

  public showAllCards(): void {
    this.flipAll(true);
  }

  public start(): void {
    this.flipAll(false);
    this.state.isStopped = false;
  }

  public stop(): void {
    this.state.isStopped = true;
  }

  public get activeCard(): CardModel | undefined {
    return this.state.gameActiveCard;
  }

  public async cardClickHandler(card: CardModel): Promise<boolean> {
    if (this.state.isStopped || this.state.isError) return false;
    if (this.state.matchedCards.has(card)) return false;
    if (card === this.state.gameActiveCard) return false;

    card.click();

    if (!this.state.gameActiveCard) {
      this.state.gameActiveCard = card;
      return true;
    }

    if (this.match(card)) return true;

    await this.error(card);
    return true;
  }

  public match(card: CardModel): boolean {
    if (card.frontImage !== this.state.gameActiveCard?.frontImage) return false;

    this.state.gameActiveCard.match(true);
    card.match(true);
    this.state.matchedCards.add(this.state.gameActiveCard);
    this.state.matchedCards.add(card);
    this.state.gameActiveCard = undefined;

    if (this.state.matchedCards.size === this.cards.length) {
      this.state.isSolved = true;
      this.stop();
      this.gameObserver.notify('game-solved', this.state);
    }
    return true;
  }

  public async error(card: CardModel): Promise<void> {
    this.state.isError = true;
    await Promise.all([this.state.gameActiveCard?.error(), card.error()]);
    this.state.isError = false;
    this.state.gameActiveCard = undefined;
  }

  public get clicks(): { all: number; error: number } {
    const [all, error] = this.cards.reduce(
      ([a, e], card) => {
        const { clickedCount, errorCount } = card.getState();
        return [a + clickedCount, e + errorCount];
      },
      [0, 0]
    );
    return { all, error };
  }

  public getMatches(): GameMatches {
    const { all, error } = this.clicks;
    return [all / 2, error / 2];
  }
}
