import { newElem } from '../lib/dom-helpers.js';
import { observer } from '../lib/observer.js';
import { ViewBEM, CssVar, CssFilter, CssFilters } from '../lib/types.js';
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

    observer.sub(`${Filters.ViewName}:save`, () => {
      const filters = settings.reduce((acc: CssFilters, st: FilterIOSettings) => {
        const cssFilter = st.cssFilter();
        acc[cssFilter.name] = { value: cssFilter.value, units: cssFilter.units };
        return acc;
      }, {} as CssFilters);
      observer.fire(`${Filters.ViewName}:filter`, filters);
    });
  }

  static wrapper (el: HTMLElement): HTMLLIElement {
    const li = newElem('li', Filters.bem('item')) as HTMLLIElement;
    li.append(el);
    return li;
  }
}
