import { ViewBEM } from '../lib/types.js';
import { htmlToElem } from '../lib/dom-helpers.js';
import { observer } from '../lib/observer.js';

export { Btn };

class Btn extends ViewBEM {
  static ViewName = 'btn';
  static clsActive = `${Btn.ViewName}--active`;

  view: HTMLButtonElement;
  isActive: boolean;
  clsActive: string;

  constructor(name: string, text: string) {
    super();
    this.isActive = false;

    const cls = `${Btn.ViewName} ${Btn.ViewName}-${name}`;

    this.view = htmlToElem(`<button class="${cls}">${text}</button>`) as HTMLButtonElement;

    this.view.addEventListener('click', () => {
      if (this.isActive) return;
      observer.fire(`${Btn.ViewName}:unset-active`);
      this.setActive();
    });

    observer.sub(`${Btn.ViewName}:unset-active`, () => this.unsetActive());
  }

  setActive() {
    if (this.isActive) return;
    this.view.classList.add(Btn.clsActive);
    this.isActive = true;
  }

  unsetActive() {
    if (!this.isActive) return;
    this.isActive = false;
    this.view.classList.remove(Btn.clsActive);
  }
}
