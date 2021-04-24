import { newElem, newDiv } from '../lib/dom-helpers.js';
import { observer } from '../lib/observer.js';
import { ViewBEM, CssVar } from '../lib/types.js';
import { FilterIOSettings } from './_filter-io.js';
import { Filters } from './_filters.js';
import { Editor, EditorSettings } from './_editor.js';

export { App };

class App extends ViewBEM {
  static ViewName = 'app';

  view: HTMLElement;
  editor: Editor;
  filters: Filters;

  constructor(editorSettings: EditorSettings, filterIOSettings: FilterIOSettings[]) {
    super();
    this.view = newElem('main', `${App.ViewName} page__block`);
    const filtersCont = newDiv(App.bem('container', 'filters'));
    const editorCont = newDiv(App.bem('container', 'editor'));
    this.view.append(filtersCont, editorCont);

    this.editor = new Editor(editorSettings);
    this.filters = new Filters(filterIOSettings);

    editorCont.append(this.editor.view);
    filtersCont.append(this.filters.view);

    observer.sub(Filters.ViewName, (cssVar: CssVar) => {
      console.log(cssVar)
      this.view.style.setProperty(cssVar.name, cssVar.value)
    });

    observer.sub(`${Editor.ViewName}:reset`, () => observer.fire(`${Filters.ViewName}:reset`));
  }
}
