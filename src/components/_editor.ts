import { htmlToElem, newElem, newDiv, newBtn, loadImg } from '../lib/dom-helpers.js';
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

    btnCont.append(this.initBtnReset('Reset'),
                   this.initBtnNext('Next picture'),
                   this.initBtnLoad('Load picture'),
                   this.initBtnSave('Save picture'));

    this.initImg();
  }

  initBtnLoad(text: string) {
    const btnLoad = htmlToElem(`<label class="btn btn-load">${text}</label>`);
    const btnLoadInput = htmlToElem(
      `<input class="btn-load__input" type="file" name="upload" placeholder="${text}">`
      ) as HTMLInputElement;
    btnLoad.append(btnLoadInput);
    btnLoad.addEventListener('click', () => console.log('load'));
    return btnLoad;
  }

  initBtnSave(text: string) {
    const btnSave = htmlToElem(`<button class="btn btn-load">${text}</button>`);
    btnSave.addEventListener('click', () => console.log('save', this.img));
    return btnSave;
  }

  initBtnReset(text: string) {
    const btnReset = htmlToElem(`<button class="btn btn-reset">${text}</button>`);
    btnReset.addEventListener('click', () => observer.fire(`${Editor.ViewName}:reset`));
    return btnReset;
  }

  initBtnNext(text: string) {
    const btnNext = htmlToElem(`<button class="btn btn-next btn--active">${text}</button>`);
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
