import { htmlToElem, newDiv, loadImg, saveImg } from '../lib/dom-helpers.js';
import { ViewBEM, ImageLinksRoll, CssFilters } from '../lib/types.js';
import { observer } from '../lib/observer.js';
import { Btn } from './_btn.js';
import { BtnIcon } from './_btn-icon.js';

export { Editor };

class Editor extends ViewBEM {
  static ViewName = 'editor';

  view: HTMLDivElement;
  imgCont: HTMLDivElement;
  img: HTMLImageElement;
  imgLinkGen: ImageLinksRoll;
  activeBtn: HTMLElement;

  constructor() {
    super();
    this.imgLinkGen = new ImageLinksRoll();

    this.view = newDiv(Editor.ViewName);

    const btnCont1 = newDiv(Editor.bem('container', ['btn', 'btn-files']));
    const btnCont2 = newDiv(Editor.bem('container', ['btn', 'btn-slider']));

    btnCont1.append(this.initBtnLoad('Load picture'),
                    this.initBtnSave('Save picture'));

    btnCont2.append(this.initBtnPrev('prev'),
                    this.initBtnNext('next'));

    this.imgCont = newDiv(Editor.bem('container', 'img'));
    this.imgCont.append(btnCont2);

    this.view.append(btnCont1, this.imgCont);

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
      // this.setActiveBtn(btnLoad);
    });
    return btnLoad;
  }

  initBtnSave(text: string) {
    const btnSave = new Btn('load', text).view;
    btnSave.addEventListener('click', () => observer.fire(`${Editor.ViewName}:save`));
    observer.sub(`${Editor.ViewName}:filter`, (filters: CssFilters) => saveImg(this.img, filters));
    return btnSave;
  }

  initBtnNext(id: string) {
    const btnNext = new BtnIcon(id).view;
    btnNext.addEventListener('click', () => this.replaceImg(() => this.imgLinkGen.nextLinkPreload()));
    return btnNext;
  }

  initBtnPrev(id: string) {
    const btnPrev = new BtnIcon(id).view;
    btnPrev.addEventListener('click', () => this.replaceImg(() => this.imgLinkGen.prevLinkPreload()));
    return btnPrev;
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
