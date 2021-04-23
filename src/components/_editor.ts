import { newElem, newDiv, newBtn } from '../lib/dom-helpers.js';

export { EditorView, EditorViewSettings };

type  EditorViewSettings = {
  reset: EventHandlerNonNull;
  save: EventHandlerNonNull;
}

class EditorView {
  view: HTMLDivElement;
  imgCont: HTMLDivElement;
  img: HTMLImageElement;
  settings: EditorViewSettings;

  constructor(settings: EditorViewSettings) {
    this.settings = settings;

    this.view = newDiv('editor');
    const btnCont = newDiv('editor__container editor__container--btn');
    this.imgCont = newDiv('editor__container editor__container--img');
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

