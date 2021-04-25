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
  static init = './assets/img/img.jpg';
  static base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images';
  static periods = ['night', 'morning', 'day', 'evening'];

  counter: number;

  constructor() {
    this.counter = 0;
  }

  get init() { return ImageLinksRoll.init; }

  next(date?: Date): string {
    const num = String(1 + this.counter++ % 20).padStart(2, '0');
    const i = Math.floor((date ?? new Date()).getHours() / 6);
    const period = ImageLinksRoll.periods[i];
    return `${ImageLinksRoll.base}/${period}/${num}.jpg`;
  }
}
