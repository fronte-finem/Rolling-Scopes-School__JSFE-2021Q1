import { newElem } from '../lib/dom-helpers.js';
import { observer } from '../lib/observer.js';
import { ViewBEM, CssVar } from '../lib/types.js';
import { FilterIO, FilterIOSettings } from './_filter-io.js';

export { Filters };

class Filters extends ViewBEM {
  static ViewName = 'filters';

  view: HTMLUListElement;

  constructor (settings: FilterIOSettings[]) {
    super();
    this.view = newElem('ul', Filters.ViewName) as HTMLUListElement;
    this.view.append(...settings.map(st => Filters.wrapper(new FilterIO(st).view)));

    observer.sub(FilterIO.ViewName, (cssVar: CssVar) => observer.fire(Filters.ViewName, cssVar));

    observer.sub(`${Filters.ViewName}:reset`, () => observer.fire(`${FilterIO.ViewName}:reset`));
  }

  static wrapper (el: HTMLElement): HTMLLIElement {
    const li = newElem('li', Filters.bem('item')) as HTMLLIElement;
    li.append(el);
    return li;
  }
}
