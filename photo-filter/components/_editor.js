import { htmlToElem, newDiv, loadImg, saveImg } from '../lib/dom-helpers.js';
import { ViewBEM, ImageLinksRoll } from '../lib/types.js';
import { observer } from '../lib/observer.js';
export { Editor1 as Editor };
let Editor1 = class Editor extends ViewBEM {
  constructor() {
    super();
    this.imgLinkGen = new ImageLinksRoll();
    this.view = newDiv(Editor.ViewName);
    const btnCont = newDiv(Editor.bem('container', 'btn'));
    this.imgCont = newDiv(Editor.bem('container', 'img'));
    this.view.append(btnCont, this.imgCont);
    btnCont.append(
      this.initBtnReset('Reset'),
      this.setActiveBtn(this.initBtnNext('Next picture')),
      this.initBtnLoad('Load picture'),
      this.initBtnSave('Save picture')
    );
    this.initImg();
  }
  // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#example_using_object_urls_to_display_images
  initBtnLoad(text) {
    const btnLoad = htmlToElem(`<label class="btn btn-load">${text}</label>`);
    const btnLoadInput = htmlToElem(
      `<input class="btn-load__input" type="file" name="upload" placeholder="${text}">`
    );
    btnLoad.append(btnLoadInput);
    btnLoadInput.addEventListener('input', async () => {
      const src = URL.createObjectURL(btnLoadInput.files[0]);
      await this.replaceImg(() => src);
      btnLoadInput.value = '';
      // ! ⚠️ prevent memory leak ⚠️
      URL.revokeObjectURL(src);
      this.setActiveBtn(btnLoad);
    });
    return btnLoad;
  }
  initBtnSave(text) {
    const btnSave = htmlToElem(`<button class="btn btn-load">${text}</button>`);
    btnSave.addEventListener('click', () =>
      observer.fire(`${Editor.ViewName}:save`)
    );
    observer.sub(`${Editor.ViewName}:filter`, (filters) => {
      saveImg(this.img, filters);
      this.setActiveBtn(btnSave);
    });
    return btnSave;
  }
  initBtnReset(text) {
    const btnReset = htmlToElem(
      `<button class="btn btn-reset">${text}</button>`
    );
    btnReset.addEventListener('click', () => {
      observer.fire(`${Editor.ViewName}:reset`);
      this.setActiveBtn(btnReset);
    });
    return btnReset;
  }
  initBtnNext(text) {
    const btnNext = htmlToElem(`<button class="btn btn-next">${text}</button>`);
    btnNext.addEventListener('click', () => {
      this.replaceImg(() => this.imgLinkGen.next());
      this.setActiveBtn(btnNext);
    });
    return btnNext;
  }
  setActiveBtn(btn) {
    if (btn === this.activeBtn) return;
    this.activeBtn?.classList.remove('btn--active');
    this.activeBtn = btn;
    this.activeBtn.classList.add('btn--active');
    return btn;
  }
  async initImg() {
    this.img = await Editor.loadImg(this.imgLinkGen.init);
    this.imgCont.append(this.img);
  }
  async replaceImg(getSrc) {
    const newImg = await Editor.loadImg(getSrc());
    this.imgCont.replaceChild(newImg, this.img);
    this.img = newImg;
  }
  static loadImg(src, alt = 'image') {
    return loadImg(Editor.bem('img'), src, alt);
  }
};
Editor1.ViewName = 'editor';
