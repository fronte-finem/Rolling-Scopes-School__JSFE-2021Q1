import styles from './modal-view.scss';
import { View } from '../../shared/views/view';

export class ModalView extends View {
  constructor() {
    super({
      classNames: [styles.modalCover, styles.hidden],
    });
  }

  async show(): Promise<void> {
    await this.setCssStateAsync(styles.hidden, false);
    document.body.classList.add(styles.rootModalMode);
  }

  async hide(): Promise<void> {
    await this.setCssStateAsync(styles.hidden, true);
    document.body.classList.remove(styles.rootModalMode);
  }
}
