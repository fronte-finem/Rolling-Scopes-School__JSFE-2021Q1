import CardModel, { ICardModelState } from './card-model';
import CardView from './card-view';

export default class Card {
  readonly view: CardView;

  private clickHandler?: (card: Card) => void;

  constructor(readonly model: CardModel) {
    this.view = new CardView(model);
    this.model.onStateChange((state) => this.updateView(<ICardModelState>state));
  }

  onClick(handler: (card: Card) => void): void {
    this.view.onClick(() => handler(this));
  }

  updateView(state: ICardModelState): void {
    this.view.flip(state.isFrontSide);
    this.view.error(state.isError);
    this.view.match(state.isMatch);
  }
}
