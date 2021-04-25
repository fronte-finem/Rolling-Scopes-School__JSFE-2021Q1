import { newElem } from '../lib/dom-helpers.js';
import { observer } from '../lib/observer.js';
import { ViewBEM } from '../lib/types.js';
import { FilterIO } from './_filter-io.js';
export { Filters1 as Filters };
let Filters1 = class Filters extends ViewBEM {
  constructor(settings) {
    super();
    this.view = newElem('ul', Filters.ViewName);
    this.view.append(
      ...settings.map((st) => Filters.wrapper(new FilterIO(st).view))
    );
    observer.sub(FilterIO.ViewName, (cssVar) =>
      observer.fire(Filters.ViewName, cssVar)
    );
    observer.sub(`${Filters.ViewName}:reset`, () =>
      observer.fire(`${FilterIO.ViewName}:reset`)
    );
    observer.sub(`${Filters.ViewName}:save`, () => {
      const filters = settings.reduce((acc, st) => {
        const cssFilter = st.cssFilter();
        acc[cssFilter.name] = {
          value: cssFilter.value,
          units: cssFilter.units,
        };
        return acc;
      }, {});
      observer.fire(`${Filters.ViewName}:filter`, filters);
    });
  }
  static wrapper(el) {
    const li = newElem('li', Filters.bem('item'));
    li.append(el);
    return li;
  }
};
Filters1.ViewName = 'filters';
