import { View } from 'shared/view';

import { ButtonType, getBtnClassName } from './config';

const mixClassName = (type = ButtonType.DEFAULT, className?: string | string[]): string[] => {
  const classNamesArray = getBtnClassName(type);
  if (!className) return classNamesArray;
  return classNamesArray.concat(Array.isArray(className) ? className : [className]);
};

export class ButtonView extends View<'button'> {
  public constructor(text = '', type = ButtonType.DEFAULT, className?: string | string[]) {
    super(mixClassName(type, className), { tag: 'button' });
    this.update(text);
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
