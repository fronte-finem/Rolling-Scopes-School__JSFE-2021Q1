import { newElem, newDiv, newBtn } from '../lib/dom-helpers.js';
import { ViewBEM } from '../lib/types.js';
import { observer } from '../lib/observer.js';

export { Editor, EditorSettings };

type EditorSettings = {
  reset: EventHandlerNonNull;
  save: EventHandlerNonNull;
}

class Editor extends ViewBEM {
  static ViewName = 'editor';

  view: HTMLDivElement;
  imgCont: HTMLDivElement;
  img: HTMLImageElement;
  settings: EditorSettings;

  constructor(settings: EditorSettings) {
    super();
    this.settings = settings;

    this.view = newDiv(Editor.ViewName);
    const btnCont = newDiv(Editor.bem('container', 'btn'));
    this.imgCont = newDiv(Editor.bem('container', 'img'));
    this.view.append(btnCont, this.imgCont);

    const btnReset = newBtn('btn btn-reset');
    const btnNext = newBtn('btn btn-next btn--active');
    const btnSave = newBtn('btn btn-save');
    btnReset.textContent = 'Reset';
    btnNext.textContent = 'Next picture';
    btnSave.textContent = 'Save picture';

    const btnLoad = newElem('label', 'btn btn-load');
    btnLoad.textContent = 'Load picture';
    const btnLoadInput = newElem('input', 'btn-load__input') as HTMLInputElement;
    btnLoadInput.name = "upload";
    btnLoadInput.type = "file";
    btnLoadInput.placeholder = 'Load picture';
    btnLoad.append(btnLoadInput);

    btnCont.append(btnReset, btnNext, btnLoad, btnSave);

    this.img = newElem('img', 'editor__img') as HTMLImageElement;
    this.img.src = './assets/img/img.jpg';
    this.img.alt = 'image';
    this.img.onload = e => this.imgCont.append(this.img);
  }
}

