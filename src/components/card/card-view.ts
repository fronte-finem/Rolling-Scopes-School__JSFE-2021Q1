import styles from './card-view.scss';
import { View } from '../../shared/views/view';
import { CardModel } from './card-model';

const getImgUrl = (imgName: string) => `url("./images/${imgName}")`;

const setBackgroundImg = (view: View, imgName: string) =>
  view.setCssStyle('backgroundImage', getImgUrl(imgName));

export class CardView extends View {
  constructor(cardModel: CardModel) {
    super({ classNames: [styles.cardContainer] });

    const back = new View({
      classNames: [styles.cardSide, styles.cardSideBack],
    });

    const front = new View({
      classNames: [styles.cardSide, styles.cardSideFront],
    });

    setBackgroundImg(back, cardModel.backImage);
    setBackgroundImg(front, cardModel.frontImage);

    this.render(new View({ classNames: [styles.card], childs: [back, front] }));
  }

  async flip(toFront = true): Promise<void> {
    await this.setCssStateAsync(styles.flipped, toFront);
  }

  error(isError = true): void {
    this.setCssState(styles.error, isError);
  }

  match(isMatch = true): void {
    this.setCssState(styles.match, isMatch);
  }
}
