import { State } from '../../shared/types';
import Model from '../../shared/models/model';
import delay from '../../shared/timer-utils';
import CardModel from '../../components/card/card-model';
import { Listener } from '../../shared/observer';

export interface IGameModelState extends State {
  isError: boolean;
  isStopped: boolean;
  isSolved: boolean;
  gameActiveCard?: CardModel;
  matchedCards: Set<CardModel>;
  startTime: Date;
  stopTime: Date;
}

export default class GameModel extends Model<IGameModelState> {
  constructor(readonly cards: CardModel[], readonly startShowTime = 5) {
    super({
      isError: false,
      isStopped: true,
      isSolved: false,
      gameActiveCard: undefined,
      matchedCards: new Set<CardModel>(),
      startTime: new Date(),
      stopTime: new Date(),
    })
    this.cards = cards;
  }

  flipAll(toFront: boolean): void {
    this.cards.forEach((card) => card.flip(toFront));
  }

  onDelayedStart(listener: Listener<void>): void {
    this.observer.subscribe('delayed-start', listener);
  }

  onSolved(listener: Listener<void>): void {
    this.observer.subscribe('game-solved', listener);
  }

  async start(): Promise<void> {
    this.flipAll(true);
    await delay(this.startShowTime * 1000);
    this.flipAll(false);
    this.state.isStopped = false;
    this.state.startTime = new Date();
    this.observer.notify('delayed-start', this.state);
  }

  stop(): void {
    this.state.isStopped = true;
    this.state.stopTime = new Date();
  }

  get activeCard(): CardModel | undefined {
    return this.state.gameActiveCard;
  }

  async cardClickHandler(card: CardModel): Promise<boolean> {
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

  match(card: CardModel): boolean {
    if (card.frontImage !== this.state.gameActiveCard?.frontImage)
      return false;

    this.state.gameActiveCard.match(true);
    card.match(true);
    this.state.matchedCards.add(this.state.gameActiveCard);
    this.state.matchedCards.add(card);
    this.state.matchedCards.add(card);
    this.state.gameActiveCard = undefined;

    if (this.state.matchedCards.size === this.cards.length) {
      this.state.isSolved = true;
      this.stop();
      this.observer.notify('game-solved', this.state);
    }
    return true;
  }

  async error(card: CardModel): Promise<void> {
    this.state.isError = true;
    await Promise.all([this.state.gameActiveCard?.error(), card.error()]);
    this.state.isError = false;
    this.state.gameActiveCard = undefined;
  }

  get clicks(): { all: number; error: number } {
    const [all, error] = this.cards.reduce(([a, e], card) =>{
      const {clickedCount, errorCount} = card.getState();
      return [a + clickedCount, e + errorCount];
    }, [0, 0])
    return { all, error };
  }

  // Расчет очков игрока должен производиться по следующей формуле:
  //   (количество сравнений - количество ошибочных сравнений) * 100 - (время прошедшее с начала в секундах) * 10.
  // При этом количество очков не должно быть меньше 0.
  get score(): number {
    const { all, error } = this.clicks;
    const diffClicks = all - error;
    const stopTime = this.state.isStopped ? this.state.stopTime : new Date();
    const diffTime = Math.round(
      (stopTime.getTime() - this.state.startTime.getTime()) / 1000
    );
    const score = diffClicks * 100 - diffTime * 10
    return score < 0 ? 0 : score;
  }
}
