import { CardModel } from 'components/card/card-model';
import { CardImagesCategory } from 'services/card-images-urls';

import styles from '~components/settings-cards/settings-cards-view.scss';

const H2: keyof HTMLElementTagNameMap = 'h2';

export const SETTINGS_CARDS = {
  title: {
    tag: H2,
    classNames: [styles.title],
    text: 'Select images preset\r\n🎴🃏',
  },
  selector: new Map([
    [
      CardImagesCategory.DOGS,
      new CardModel(1, 'dogs/05.jpg', 'covers/dog.svg', 0),
    ],
    [
      CardImagesCategory.CATS,
      new CardModel(2, 'cats/27.jpg', 'covers/cat.svg', 0),
    ],
  ]),
};
