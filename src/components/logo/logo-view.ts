import { APP_CONFIG } from 'app/app.config';
import { LinkView } from 'shared/views/link/link';
import { View } from 'shared/views/view';

import styles from './logo-view.scss';

const TEXT = 'match';

export class LogoView extends LinkView {
  public constructor() {
    super({ url: APP_CONFIG.initialRoute.url, classNames: [styles.logo] });
    this.init();
  }

  private init() {
    const text1 = new View({ classNames: [styles.text, styles.text1] });
    const text2 = new View({ classNames: [styles.text, styles.text2] });
    text1.setText(TEXT);
    text2.setText(TEXT);
    this.render([text1, text2]);
  }
}
