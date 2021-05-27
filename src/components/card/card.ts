import { CardModel, ICardModelState } from './card-model';
import { CardView } from './card-view';

export class Card {
  public readonly view: CardView;

  private clickHandler?: (card: Card) => void;

  public constructor(public readonly model: CardModel) {
    this.view = new CardView(model);
    this.model.onStateChange((state) => this.updateView(state));
  }

  public onClick(handler: (card: Card) => unknown): void {
    this.view.onClick(() => handler(this));
  }

  private async updateView(state: ICardModelState): Promise<void> {
    this.view.error(state.isError);
    this.view.match(state.isMatch);
    await this.view.flip(state.isFrontSide);
  }
}
