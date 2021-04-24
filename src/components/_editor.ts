import { newElem, newDiv, newBtn, newImg, loadImg } from '../lib/dom-helpers.js';
import { ViewBEM, ImageLinksRoll } from '../lib/types.js';
import { observer } from '../lib/observer.js';
import { resolve } from 'node:path';

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
  imgLinkGen: ImageLinksRoll;

  constructor(settings: EditorSettings) {
    super();
    this.settings = settings;
    this.imgLinkGen = new ImageLinksRoll();

    this.view = newDiv(Editor.ViewName);
    const btnCont = newDiv(Editor.bem('container', 'btn'));
    this.imgCont = newDiv(Editor.bem('container', 'img'));
    this.view.append(btnCont, this.imgCont);

    btnCont.append(this.initBtnReset(),
                   this.initBtnNext(),
                   this.initBtnLoad(),
                   this.initBtnSave());

    this.initImg();
  }

  initBtnLoad() {
    const btnLoad = newElem('label', 'btn btn-load');
    btnLoad.textContent = 'Load picture';
    const btnLoadInput = newElem('input', 'btn-load__input') as HTMLInputElement;
    btnLoadInput.name = "upload";
    btnLoadInput.type = "file";
    btnLoadInput.placeholder = 'Load picture';
    btnLoad.append(btnLoadInput);
    btnLoad.addEventListener('click', () => console.log('load'));
    return btnLoad;
  }

  initBtnSave() {
    const btnSave = newBtn('btn btn-save');
    btnSave.textContent = 'Save picture';
    btnSave.addEventListener('click', () => console.log('save', this.img));
    return btnSave;
  }

  initBtnReset() {
    const btnReset = newBtn('btn btn-reset');
    btnReset.textContent = 'Reset';
    btnReset.addEventListener('click', () => observer.fire(`${Editor.ViewName}:reset`));
    return btnReset;
  }

  initBtnNext() {
    const btnNext = newBtn('btn btn-next btn--active');
    btnNext.textContent = 'Next picture';
    btnNext.addEventListener('click', async () => {
      let newImg = await Editor.loadImg(this.imgLinkGen.next());
      this.imgCont.replaceChild(newImg, this.img);
      this.img = newImg;
    });
    return btnNext;
  }

  async initImg() {
    this.img = await Editor.loadImg(this.imgLinkGen.init);
    this.imgCont.append(this.img);
  }

  static loadImg(src: string, alt: string = 'image'): Promise<HTMLImageElement> {
    return loadImg(Editor.bem('img'), src, alt);
  }
}
