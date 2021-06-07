import { View } from 'shared/view';

import { MODAL_CSS_CLASS } from './modal.css';

export enum ModalState {
  HIDDEN = 'hidden',
  VISIBLE = 'visible',
}

export class ModalView extends View<ModalState> {
  public constructor() {
    super(MODAL_CSS_CLASS.modal);
    this.init();
  }

  protected init(): void {
    this.hide();
  }

  public update(state: ModalState): void {
    const hide = state === ModalState.HIDDEN;
    this.setCssState(MODAL_CSS_CLASS.hidden, hide);
    document.body.classList.toggle(MODAL_CSS_CLASS.bodyHidden, !hide);
  }

  public hide(): void {
    this.update(ModalState.HIDDEN);
  }

  public show(): void {
    this.update(ModalState.VISIBLE);
  }
}
