import { htmlToElem, newElem, newDiv, newBtn, loadImg, saveImg } from '../lib/dom-helpers.js';
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

  // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#example_using_object_urls_to_display_images

  initBtnLoad(text: string) {
    const btnLoad = htmlToElem(`<label class="btn btn-load">${text}</label>`);
    const btnLoadInput = htmlToElem(
      `<input class="btn-load__input" type="file" name="upload" placeholder="${text}">`
      ) as HTMLInputElement;
    btnLoad.append(btnLoadInput);
    btnLoadInput.addEventListener('input', async () => {
      const src = URL.createObjectURL(btnLoadInput.files[0]);
      await this.replaceImg(() => src);
      btnLoadInput.value = '';
      // ! ⚠️ prevent memory leak ⚠️
      URL.revokeObjectURL(src);
    });
    return btnLoad;
  }

  initBtnSave(text: string) {
    const btnSave = htmlToElem(`<button class="btn btn-load">${text}</button>`);
    btnSave.addEventListener('click', () => {
      saveImg(this.img);
    });
    return btnSave;
  }

  initBtnReset(text: string) {
    const btnReset = htmlToElem(`<button class="btn btn-reset">${text}</button>`);
    btnReset.addEventListener('click', () => observer.fire(`${Editor.ViewName}:reset`));
    return btnReset;
  }

  initBtnNext(text: string) {
    const btnNext = htmlToElem(`<button class="btn btn-next btn--active">${text}</button>`);
    btnNext.addEventListener('click', this.replaceImg.bind(this, () => this.imgLinkGen.next()));
    return btnNext;
  }

  async initImg() {
    this.img = await Editor.loadImg(this.imgLinkGen.init);
    this.imgCont.append(this.img);
  }

  async replaceImg(getSrc: () => string) {
    const newImg = await Editor.loadImg(getSrc());
    this.imgCont.replaceChild(newImg, this.img);
    this.img = newImg;
  }

  static loadImg(src: string, alt: string = 'image'): Promise<HTMLImageElement> {
    return loadImg(Editor.bem('img'), src, alt);
  }
}
