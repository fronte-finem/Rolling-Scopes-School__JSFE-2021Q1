import { CardModel } from 'components/card/card-model';

import styles from '~pages/error/error.scss';

const H2: keyof HTMLElementTagNameMap = 'h2';

export const PAGE_ERROR = {
  title: {
    tag: H2,
    classNames: [styles.title],
    getMessage: (url: string): string =>
      `🤔 Page "${url}" — unknown! 🤔\r\n😱 It's 404 code, OMG! 😱`,
  },
  card: new CardModel(2, 'cats/27.jpg', 'dogs/05.jpg', 0),
};
