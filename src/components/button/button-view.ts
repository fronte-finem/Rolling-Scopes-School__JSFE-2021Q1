import { View } from 'shared/view';

import { BUTTON_CSS_CLASS } from './button.css';

export class ButtonView extends View<string, 'button'> {
  public constructor(text: string) {
    super(BUTTON_CSS_CLASS.button, { tag: 'button' });
    this.update(text);
  }

  protected init(): void {
    this.root.textContent = '';
  }

  public update(text: string): void {
    this.root.textContent = text;
  }

  public switch(enable = true): void {
    this.root.disabled = !enable;
  }

  public enable(): void {
    this.switch();
  }

  public disable(): void {
    this.switch(false);
  }
}
