import { newElem, newDiv, htmlToElem } from '../lib/dom-helpers.js';
import { observer } from '../lib/observer.js';
import { ViewBEM, CssVar, CssFilter, CssFilters } from '../lib/types.js';
import { Btn } from './_btn.js';
import { FilterIO, FilterIOSettings } from './_filter-io.js';

export { Filters };

class Filters extends ViewBEM {
  static ViewName = 'filters';

  view: HTMLElement;

  constructor (settings: FilterIOSettings[]) {
    super();

    this.view = newDiv(Filters.ViewName);

    const btnCont = newDiv(Filters.bem('container', 'btn'));
    btnCont.append(this.initBtnReset('Reset'));

    const filters = newElem('ul', Filters.bem('items')) as HTMLUListElement;
    filters.append(...settings.map(st => Filters.wrapper(new FilterIO(st).view)));

    this.view.append(btnCont, filters);

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

  initBtnReset(text: string) {
    const btnReset = new Btn('reset', text).view;
    btnReset.addEventListener('click', () => observer.fire(`${Filters.ViewName}:reset`));
    return btnReset;
  }

  static wrapper (el: HTMLElement): HTMLLIElement {
    const li = newElem('li', Filters.bem('item')) as HTMLLIElement;
    li.append(el);
    return li;
  }
}
