import { CardModel, ICardModelState } from './card-model';
import { CardView } from './card-view';

export class Card {
  readonly view: CardView;

  private clickHandler?: (card: Card) => void;

  constructor(readonly model: CardModel) {
    this.view = new CardView(model);
    this.model.onStateChange((state) => this.updateView(state));
  }

  onClick(handler: (card: Card) => unknown): void {
    this.view.onClick(() => handler(this));
  }

  async updateView(state: ICardModelState): Promise<void> {
    await this.view.flip(state.isFrontSide);
    this.view.error(state.isError);
    this.view.match(state.isMatch);
  }
}
