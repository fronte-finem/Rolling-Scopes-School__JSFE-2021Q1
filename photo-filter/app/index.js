class ViewBEM {
  static bem(element, modificator) {
    const mods = Array.isArray(modificator) ? modificator : (modificator ? [modificator] : []);
    const elem = element ? `${this.ViewName}__${element}` : this.ViewName;
    return [elem, ...mods.map((mod) => `${elem}--${mod}`)].join(' ');
  }
};

class ImageLinksRoll {
  constructor() {
    this.counter = 0;
  }

  get init() {
    return ImageLinksRoll.init;
  }

  next(date) {
    const num = String(1 + (this.counter++ % 20)).padStart(2, '0');
    const i = Math.floor((date ?? new Date()).getHours() / 6);
    const period = ImageLinksRoll.periods[i];
    return `${ImageLinksRoll.base}/${period}/${num}.jpg`;
  }
}
ImageLinksRoll.init = './assets/img/img.jpg';
ImageLinksRoll.base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images';
ImageLinksRoll.periods = ['night', 'morning', 'day', 'evening'];

const newDiv = (className) => newElem('div', className);

function newElem(tag, className) {
  const elem = document.createElement(tag);
  elem.className = className;
  return elem;
}

function htmlToElem(template) {
  const tmp = document.createElement('template');
  tmp.innerHTML = template;
  return tmp.content.firstElementChild;
}

function newImg(className, src, alt = 'image') {
  const img = newElem('img', className);
  img.setAttribute('crossOrigin', 'anonymous');
  img.setAttribute('src', src);
  img.setAttribute('alt', alt);
  return img;
}

function loadImg(className, src, alt = 'image') {
  return new Promise((resolve) => {
    const img = newImg(className, src, alt);
    img.addEventListener('load', () => resolve(img));
  });
}

function saveImg(img, filters) {
  const canvas = drawImg(img, filters);
  canvas.toBlob(function (blob) {
    const uri = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.download = 'download.png';
    link.href = uri;
    link.click();
    // ! ⚠️ prevent memory leak ⚠️
    // no longer need to read the blob so it's revoked
    URL.revokeObjectURL(uri);
  });
}

function drawImg(img, filters) {
  const canvas = document.createElement('canvas');
  const blur = filters['blur'].value;
  const kW = img.naturalWidth / img.width;
  const kH = img.naturalHeight / img.height;
  filters['blur'].value = (blur * Math.max(kW, kH)).toFixed(2);
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  console.log(filters);
  const ctx = canvas.getContext('2d');
  const filtersString = Object.entries(filters)
    .map(([name, { value, units }]) => `${name}(${value}${units})`)
    .join(' ');
  console.log(filtersString);
  ctx.filter = filtersString;
  ctx.drawImage(img, 0, 0);
  return canvas;
}

class Observer {
  constructor() {
    this.listeners = {};
    console.log('Observer constructor called!', this);
  }

  static getInstance() {
    if (!Observer.singleton) Observer.singleton = new Observer();
    return Observer.singleton;
  }

  sub(type, handler) {
    this.listeners[type] || (this.listeners[type] = []);
    this.listeners[type].push(handler);
  }

  unsub(type, handler) {
    if (!this.listeners[type]) return;
    this.listeners[type] = this.listeners[type].filter(
      (obs) => obs !== handler
    );
  }

  fire(type, ...args) {
    if (!this.listeners[type]) return;
    this.listeners[type].forEach((handler) => handler.apply(null, args));
  }
};

const observer = Observer.getInstance();

class FilterIO extends ViewBEM {
  constructor(settings) {
    super();
    this.settings = settings;
    this.view = newDiv(FilterIO.ViewName);

    this.input = htmlToElem(
      `<input class="${FilterIO.bem('input')}" type="range" value="${settings.value}" min="${settings.min}" max="${settings.max}">`
    );

    this.output = htmlToElem(
      `<output class="${FilterIO.bem('output')}" name="result">${settings.value}</output>`
    );

    const label = htmlToElem(
      `<label class="${FilterIO.bem('label')}">${settings.prettyName}:</label>`
    );

    label.append(this.input);
    this.view.append(label, this.output);

    observer.sub(`${FilterIO.ViewName}:reset`, () =>
      observer.fire(`${this.settings.name}:reset`)
    );

    observer.sub(`${this.settings.name}:set`, (value) => {
      this.output.value = String(value);
      this.input.value = String(value);
      observer.fire(FilterIO.ViewName, this.settings.cssVar);
    });

    this.input.addEventListener('input', () => {
      observer.fire(`${this.settings.name}:new`, Number(this.input.value));
    });
  }
};
FilterIO.ViewName = 'filter-io';

class FilterIOSettings {
  constructor(name, value, min, max, units) {
    this.name = name.toLowerCase();
    this.initValue = value;
    this.value = value;
    this.min = min;
    this.max = max;
    this.units = units;

    observer.sub(`${this.name}:new`, (value1) => {
      this.value = value1;
      observer.fire(`${this.name}:set`, this.value);
    });

    observer.sub(`${this.name}:reset`, () => {
      this.value = this.initValue;
      observer.fire(`${this.name}:set`, this.value);
    });
  }

  get prettyName() {
    return `${this.name[0].toUpperCase()}${this.name.substring(1)}`;
  }

  get cssVar() {
    return {
      name: `--${this.name}`,
      value: `${this.value}${this.units}`,
    };
  }

  cssFilter() {
    return {
      name: this.name,
      value: this.value,
      units: this.units,
    };
  }
};

class Filters extends ViewBEM {
  constructor(settings1) {
    super();
    this.view = newElem('ul', Filters.ViewName);
    this.view.append(
      ...settings1.map((st) => Filters.wrapper(new FilterIO(st).view))
    );

    observer.sub(FilterIO.ViewName, (cssVar) =>
      observer.fire(Filters.ViewName, cssVar)
    );

    observer.sub(`${Filters.ViewName}:reset`, () =>
      observer.fire(`${FilterIO.ViewName}:reset`)
    );

    observer.sub(`${Filters.ViewName}:save`, () => {
      const filters = settings1.reduce((acc, st) => {
        const cssFilter = st.cssFilter();
        acc[cssFilter.name] = {
          value: cssFilter.value,
          units: cssFilter.units,
        };
        return acc;
      }, {});
      observer.fire(`${Filters.ViewName}:filter`, filters);
    });
  }

  static wrapper(el) {
    const li = newElem('li', Filters.bem('item'));
    li.append(el);
    return li;
  }
};
Filters.ViewName = 'filters';

class Editor extends ViewBEM {
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
    const btnReset = htmlToElem(`<button class="btn btn-reset">${text}</button>`);
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
    const newImg1 = await Editor.loadImg(getSrc());
    this.imgCont.replaceChild(newImg1, this.img);
    this.img = newImg1;
  }

  static loadImg(src, alt = 'image') {
    return loadImg(Editor.bem('img'), src, alt);
  }
};
Editor.ViewName = 'editor';

class App extends ViewBEM {
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
App.ViewName = 'app';

window.addEventListener('load', (e) => {
  initFullscreanBtn();
  initThemeToggleBtn();

  const appCont = document.querySelector('.page__container--app');

  const filterIOViewSettings = [
    new FilterIOSettings('blur', 0, 0, 10, 'px'),
    new FilterIOSettings('invert', 0, 0, 100, '%'),
    new FilterIOSettings('sepia', 0, 0, 100, '%'),
    new FilterIOSettings('saturate', 100, 0, 200, '%'),
    new FilterIOSettings('hue-rotate', 0, 0, 360, 'deg'),
    new FilterIOSettings('opacity', 100, 0, 100, '%'),
    new FilterIOSettings('contrast', 100, 0, 200, '%'),
    new FilterIOSettings('brightness', 100, 0, 200, '%'),
    new FilterIOSettings('grayscale', 0, 0, 100, '%'),
  ];

  const app = new App(filterIOViewSettings);
  appCont.append(app.view);

  // testImageLinksRoll();

  function testImageLinksRoll() {
    const imageLinksRoll = new ImageLinksRoll();
    for (let h = 0; h < 24; h++)
      for (let m = 0; m < 60; m++) {
        const date = new Date(2021, 0, 0, h, m);
        console.log(
          imageLinksRoll.next(date).replace(/.*images./, ''),
          date.toTimeString()
        );
      }
  }
});

function initFullscreanBtn() {
  const btn = document.querySelector('.btn-icon--fullscreen');
  btn.addEventListener('click', toggleFullScreen);
}

function toggleFullScreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else document.exitFullscreen && document.exitFullscreen();
}

function initThemeToggleBtn() {
  const toggle = {
    dark: {
      theme: 'light',
      page: {
        old: 'page--dark',
        new: 'page--light',
      },
      btn: {
        old: 'btn-icon--theme-to-light',
        new: 'btn-icon--theme-to-dark',
      },
    },
    light: {
      theme: 'dark',
      page: {
        old: 'page--light',
        new: 'page--dark',
      },
      btn: {
        old: 'btn-icon--theme-to-dark',
        new: 'btn-icon--theme-to-light',
      },
    },
  };

  const page = document.querySelector('.page');
  const btn = document.querySelector('.btn-icon--theme');

  btn.addEventListener('click', () => {
    const state = toggle[page.dataset.theme];
    page.dataset.theme = state.theme;
    page.classList.replace(state.page.old, state.page.new);
    btn.classList.replace(state.btn.old, state.btn.new);
  });
}
