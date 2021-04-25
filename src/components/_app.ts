import { newElem, newDiv } from '../lib/dom-helpers.js';
import { observer } from '../lib/observer.js';
import { ViewBEM, CssVar, CssFilters } from '../lib/types.js';
import { FilterIOSettings } from './_filter-io.js';
import { Filters } from './_filters.js';
import { Editor } from './_editor.js';

export { App };

class App extends ViewBEM {
  static ViewName = 'app';

  view: HTMLElement;
  editor: Editor;
  filters: Filters;

  constructor(filterIOSettings: FilterIOSettings[]) {
    super();
    this.view = newElem('main', `${App.ViewName} page__block`);
    const filtersCont = newDiv(App.bem('container', 'filters'));
    const editorCont = newDiv(App.bem('container', 'editor'));
    this.view.append(filtersCont, editorCont);

    this.editor = new Editor();
    this.filters = new Filters(filterIOSettings);

    editorCont.append(this.editor.view);
    filtersCont.append(this.filters.view);

    observer.sub(Filters.ViewName, (cssVar: CssVar) => this.view.style.setProperty(cssVar.name, cssVar.value));

    observer.sub(`${Editor.ViewName}:reset`, () => observer.fire(`${Filters.ViewName}:reset`));

    observer.sub(`${Editor.ViewName}:save`, () => observer.fire(`${Filters.ViewName}:save`));

    observer.sub(`${Filters.ViewName}:filter`, (filters: CssFilters) => observer.fire(`${Editor.ViewName}:filter`, filters));
  }
}
