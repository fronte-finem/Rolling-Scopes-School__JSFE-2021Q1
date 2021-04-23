import { newElem } from '../lib/dom-helpers.js';
import { FilterIOViewSettings } from '../components/_filter-io.js';
import { EditorViewSettings } from '../components/_editor.js';
import { AppView } from '../components/_app.js';

window.addEventListener('load', (e) => {
  const appCont = document.querySelector('.page__container--app');

  const filterIOViewSettings = [
    new FilterIOViewSettings('blur', 0, 0, 10, 'px'),
    new FilterIOViewSettings('invert', 0, 0, 100, '%'),
    new FilterIOViewSettings('sepia', 0, 0, 100, '%'),
    new FilterIOViewSettings('saturate', 100, 0, 200, '%'),
    new FilterIOViewSettings('hue', 0, 0, 360, 'deg'),
  ];

  const editorViewSettings: EditorViewSettings = {
    reset: () => null,
    save: () => null,
  };

  appCont.append(new AppView(editorViewSettings, filterIOViewSettings).view);

  console.log(appCont);
});
