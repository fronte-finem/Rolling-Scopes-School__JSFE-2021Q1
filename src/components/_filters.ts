import { newElem } from '../lib/dom-helpers.js';
import { observer } from '../lib/observer.js';
import { CssVar } from '../lib/types.js';
import { FilterIO, FilterIOSettings } from './_filter-io.js';

export { Filters };

class Filters {
  static viewName = 'filters';

  view: HTMLUListElement;

  constructor (settings: FilterIOSettings[]) {
    this.view = newElem('ul', Filters.viewName) as HTMLUListElement;
    this.view.append(...settings.map(st => Filters.wrapper(new FilterIO(st).view)));

    observer.sub(FilterIO.viewName, (cssVar: CssVar) => observer.fire(Filters.viewName, cssVar));
  }

  static wrapper (el: HTMLElement): HTMLLIElement {
    const li = newElem('li', `${Filters.viewName}__item`) as HTMLLIElement;
    li.append(el);
    return li;
  }
}
