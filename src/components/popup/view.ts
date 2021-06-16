import { ButtonView } from 'components/button';
import { ButtonType } from 'components/button/config';
import { ModalView } from 'components/modal';
import { createElement } from 'shared/dom-utils';
import { View } from 'shared/view';

import styles from './style.module.scss';

export enum PopupState {
  HIDDEN = 'hidden',
  VISIBLE = 'visible',
}

export class PopupView extends View {
  private header = createElement(styles.header, { tag: 'header' });
  private content = createElement(styles.content);
  private btnClose = new ButtonView('', ButtonType.DELETE, styles.btnClose);
  public onShow?: () => void;
  public onHide?: () => void;

  public constructor(private modal: ModalView) {
    super(styles.popup);
    this.build();
    this.initBinds();
  }

  private build(): void {
    this.root.append(this.header, this.content, this.btnClose.getRoot());
    void this.setCssStateAsync(styles.hidden, true);
  }

  private initBinds(): void {
    this.modal.onClick(() => this.hide());
    this.btnClose.onClick(() => this.hide());
  }

  public showText(title: string, message: string): void {
    this.header.textContent = title;
    this.content.textContent = message;
    this.show();
  }

  public render(title: string, element: HTMLElement): void {
    this.header.textContent = title;
    this.content.append(element);
    this.show();
  }

  public async hide(): Promise<void> {
    this.modal.hide();
    document.body.removeEventListener('keydown', this.escapeListener);
    await this.setCssStateAsync(styles.hidden, true);
    this.header.innerHTML = '';
    this.content.innerHTML = '';
    this.onHide?.();
  }

  public show(): void {
    this.modal.show();
    this.setCssState(styles.hidden, false);
    document.body.addEventListener('keydown', this.escapeListener, { once: true });
    this.onShow?.();
  }

  private escapeListener = (event: KeyboardEvent) => {
    if (event.code === 'Escape') void this.hide();
  };
}
