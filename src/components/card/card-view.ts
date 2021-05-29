import { View } from '../../shared/views/view';

import { CardModel } from './card-model';

import styles from './card-view.scss';

const getImgUrl = (imgName: string) => `url("./images/${imgName}")`;

export class CardView extends View {
  public constructor(cardModel: CardModel) {
    super({ classNames: [styles.cardContainer] });
    this.init(cardModel);
  }

  private init(cardModel: CardModel) {
    const back = new View({
      classNames: [styles.cardSide, styles.cardSideBack],
    });
    const front = new View({
      classNames: [styles.cardSide, styles.cardSideFront],
    });
    back.setCssStyle('backgroundImage', getImgUrl(cardModel.backImage));
    front.setCssStyle('backgroundImage', getImgUrl(cardModel.frontImage));
    this.render(new View({ classNames: [styles.card], childs: [back, front] }));
  }

  public async flip(toFront = true): Promise<void> {
    await this.setCssStateAsync(styles.flipped, toFront);
  }

  public error(isError = true): void {
    this.setCssState(styles.error, isError);
  }

  public match(isMatch = true): void {
    this.setCssState(styles.match, isMatch);
  }
}
