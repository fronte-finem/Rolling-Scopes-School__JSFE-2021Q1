import { newElem, newDiv } from '../lib/dom-helpers.js';
import { observer } from '../lib/observer.js';
import { ViewBEM } from '../lib/types.js';
import { Filters } from './_filters.js';
import { Editor } from './_editor.js';
export { App1 as App };
let App1 = class App extends ViewBEM {
  constructor(filterIOSettings) {
    super();
    this.view = newElem('main', `${App.ViewName} page__block`);
    const filtersCont = newDiv(App.bem('container', 'filters'));
    const editorCont = newDiv(App.bem('container', 'editor'));
    this.view.append(filtersCont, editorCont);
    this.editor = new Editor();
    this.filters = new Filters(filterIOSettings);
    editorCont.append(this.editor.view);
    filtersCont.append(this.filters.view);
    observer.sub(Filters.ViewName, (cssVar) =>
      this.view.style.setProperty(cssVar.name, cssVar.value)
    );
    observer.sub(`${Editor.ViewName}:reset`, () =>
      observer.fire(`${Filters.ViewName}:reset`)
    );
    observer.sub(`${Editor.ViewName}:save`, () =>
      observer.fire(`${Filters.ViewName}:save`)
    );
    observer.sub(`${Filters.ViewName}:filter`, (filters) =>
      observer.fire(`${Editor.ViewName}:filter`, filters)
    );
  }
};
App1.ViewName = 'app';
