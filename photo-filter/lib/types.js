export let ViewBEM = class ViewBEM {
  static bem(element, modificator) {
    const mods = Array.isArray(modificator)
      ? modificator
      : modificator
      ? [modificator]
      : [];
    const elem = element ? `${this.ViewName}__${element}` : this.ViewName;
    return [elem, ...mods.map((mod) => `${elem}--${mod}`)].join(' ');
  }
};
let ImageLinksRoll1 = class ImageLinksRoll {
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
};
export { ImageLinksRoll1 as ImageLinksRoll };
ImageLinksRoll1.init = './assets/img/img.jpg';
ImageLinksRoll1.base =
  'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images';
ImageLinksRoll1.periods = ['night', 'morning', 'day', 'evening'];
