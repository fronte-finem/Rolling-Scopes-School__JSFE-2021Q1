import { View } from 'shared/view';

import styles from './style.module.scss';

export enum ModalState {
  HIDDEN = 'hidden',
  VISIBLE = 'visible',
}

export class ModalView extends View {
  public constructor() {
    super(styles.modal);
    this.hide();
  }

  public update(state: ModalState): void {
    const hide = state === ModalState.HIDDEN;
    this.setCssState(styles.hidden, hide);
    document.body.classList.toggle(styles.bodyHidden, !hide);
  }

  public hide(): void {
    this.update(ModalState.HIDDEN);
  }

  public show(): void {
    this.update(ModalState.VISIBLE);
  }
}
