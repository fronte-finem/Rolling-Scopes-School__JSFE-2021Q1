import { newElem, newDiv } from '../lib/dom-helpers.js';
import { FilterIOViewSettings } from './_filter-io.js';
import { FiltersView } from './_filters.js';
import { EditorView, EditorViewSettings } from './_editor.js';

export { AppView };

class AppView {
  view: HTMLElement;
  editorView: EditorView;
  filtersView: FiltersView;

  constructor(editorViewSettings: EditorViewSettings, filterIOViewSettings: FilterIOViewSettings[]) {
    this.view = newElem('main', 'app page__block');
    const filtersCont = newDiv('app__container app__container--filters');
    const editorCont = newDiv('app__container app__container--editor');
    this.view.append(filtersCont, editorCont);

    this.editorView = new EditorView(editorViewSettings);
    this.filtersView = new FiltersView(filterIOViewSettings);

    editorCont.append(this.editorView.view);
    filtersCont.append(this.filtersView.view);
  }
}
