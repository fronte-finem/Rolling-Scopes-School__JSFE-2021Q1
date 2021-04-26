import { loadImg } from './dom-helpers';

export type CssVar = {
  name: string;
  value: string;
}

export type CssFilter = {
  name: string;
  value: number;
  units: string;
}

export type CssFilterName = string;

export type CssFilterValue = {
  value: number;
  units: string;
}

export type CssFilters = Map<CssFilterName, CssFilterValue>


export abstract class ViewBEM {
  static ViewName: string;

  static bem(element?: string, modificator?: string | string[]): string {
    const mods = Array.isArray(modificator) ? modificator : (modificator ? [modificator] : []);
    const elem = element ? `${this.ViewName}__${element}` : this.ViewName;
    return [elem, ...mods.map(mod => `${elem}--${mod}`)].join(' ');
  }
}

export class ImageLinksRoll {
  limit: number;
  counter: number;

  constructor(limit = 20) {
    this.limit = limit;
    this.counter = 0;
    this.preloadImages();
  }

  // preload <amount> images before and after current img
  preloadImages(amount = 5) {
    const saveCount = this.counter;
    const amount2 = amount * 2;
    for (let i = 0; i < amount; i++) { this.prev }
    for (let i = 0; i < (10); i++) {
      loadImg('img-preload', this.nextLink(), '');
    }
    this.counter = saveCount;
  }

  get next() {
    this.counter++;
    if (this.counter > this.limit) this.counter = 1;
    return this.counter;
  }

  get prev() {
    this.counter--;
    if (this.counter < 1) this.counter = this.limit;
    return this.counter;
  }

  get init() { return './assets/img/img.jpg'; }

  get base() { return 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images'; }

  get periods() { return ['night', 'morning', 'day', 'evening']; }

  nextLinkPreload(date?: Date) {
    const link = this.nextLink(date);
    this.preloadImages();
    return link;
  }

  prevLinkPreload(date?: Date) {
    const link = this.prevLink(date);
    this.preloadImages();
    return link;
  }

  nextLink(date?: Date) {
    return this.getLink(this.fmt(this.next), date);
  }

  prevLink(date?: Date) {
    return this.getLink(this.fmt(this.prev), date);
  }

  fmt(num: number) {
    return String(num).padStart(2, '0');
  }

  getLink(num: string, date?: Date) {
    return `${this.base}/${this.period(date)}/${num}.jpg`;
  }

  period(date?: Date) {
    const i = Math.floor((date ?? new Date()).getHours() / 6);
    return this.periods[i];
  }
}
