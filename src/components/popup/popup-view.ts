import { ModalView } from 'components/modal';
import { View } from 'shared/view';

import { POPUP_CSS_CLASS } from './popup.css';

export enum PopupState {
  HIDDEN = 'hidden',
  VISIBLE = 'visible',
}

export class PopupView extends View {
  public constructor(private modal: ModalView) {
    super(POPUP_CSS_CLASS.popup);
    this.init();
  }

  private init(): void {
    this.hide();
    this.modal.onClick(() => this.hide());
  }

  public update(message: string): void {
    this.root.textContent = message;
    this.show();
  }

  public hide(): void {
    this.modal.hide();
    this.setCssState(POPUP_CSS_CLASS.hidden, true);
    document.body.removeEventListener('keydown', this.escapeListener);
  }

  public show(): void {
    this.modal.show();
    this.setCssState(POPUP_CSS_CLASS.hidden, false);
    document.body.addEventListener('keydown', this.escapeListener, { once: true });
  }

  private escapeListener = (event: KeyboardEvent) => {
    if (event.code === 'Escape') this.hide();
  };
}
