import { ViewBEM } from '../lib/types.js';
import { htmlToElem } from '../lib/dom-helpers.js';
import { observer } from '../lib/observer.js';

export { BtnIcon };

class BtnIcon extends ViewBEM {
  static ViewName = 'btn-icon';

  view: HTMLButtonElement;
  isActive: boolean;
  clsActive: string;

  constructor(id: string) {
    super();
    this.isActive = false;

    const cls = `${BtnIcon.ViewName} ${BtnIcon.ViewName}-${id}`;

    this.view = htmlToElem(`
      <button class="${cls}">
        <svg class="svg-icon svg-icon--${id}">
          <use href="./assets/svg/sprite-icon.svg#${id}">
        </svg>
      </button>`
    ) as HTMLButtonElement;
  }
}
