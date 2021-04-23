import { newElem } from '../lib/dom-helpers.js';
import { FilterIOView, FilterIOViewSettings } from './_filter-io.js';

export { FiltersView };

class FiltersView {
  view: HTMLUListElement;

  constructor (settings: FilterIOViewSettings[]) {
    this.view = newElem('ul', 'filters') as HTMLUListElement;
    this.view.append(...settings.map(st => FiltersView.wrapper(new FilterIOView(st).view)));
  }

  static wrapper (el: HTMLElement): HTMLLIElement {
    const li = newElem('li', 'filters__item') as HTMLLIElement;
    li.append(el);
    return li;
  }
}
