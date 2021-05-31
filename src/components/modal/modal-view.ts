import { View } from 'shared/views/view';

import styles from './modal-view.scss';

export class ModalView extends View {
  public constructor() {
    super({
      classNames: [styles.modalCover, styles.hidden],
    });
  }

  public async show(): Promise<void> {
    await this.setCssStateAsync(styles.hidden, false);
    document.body.classList.add(styles.rootModalMode);
  }

  public async hide(): Promise<void> {
    await this.setCssStateAsync(styles.hidden, true);
    document.body.classList.remove(styles.rootModalMode);
  }
}
