import { View } from 'shared/views/view';

import styles from './about.scss';

export const createInfo = (
  text: string,
  className: string[] = []
): View<HTMLElement> => {
  const info = new View({
    classNames: [styles.info, styles.cell, ...className],
  });
  const textView = new View({ classNames: [styles.text], text });
  info.render(textView);
  return info;
};

export const createPict = (
  content: View,
  className: string[] = []
): View<HTMLElement> => {
  const pict = new View({
    classNames: [styles.pict, styles.cell, ...className],
  });
  pict.render(content);
  return pict;
};
