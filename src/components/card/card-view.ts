import style from './card-view.scss';
import { View } from '../../shared/views/view';
import { Factory } from '../../shared/views/view-factory';
import { CardModel } from './card-model';

export class CardView extends View {
  constructor(cardModel: CardModel) {
    super({
      classNames: [style.cardContainer],
      statesClassNames: [
        ['flip', style.cardContainerCardFlipped],
        ['error', style.cardContainerCardError],
        ['match', style.cardContainerCardMatch],
      ],
    });
    const back = Factory.view({
      classNames: [style.cardSide, style.cardSideBack],
    });
    back.element.style.backgroundImage = `url("./images/${cardModel.backImage}")`;

    const front = Factory.view({
      classNames: [style.cardSide, style.cardSideFront],
    });
    front.element.style.backgroundImage = `url("./images/${cardModel.frontImage}")`;

    const card = Factory.view({ classNames: [style.card], childs: [back, front] });

    this.render(card);
  }

  flip(toFront = true): Promise<void> {
    this.setCssState('flip', toFront);
    return new Promise((resolve) => {
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }

  error(isError = true): void {
    this.setCssState('error', isError);
  }

  match(isMatch = true): void {
    this.setCssState('match', isMatch);
  }
}
