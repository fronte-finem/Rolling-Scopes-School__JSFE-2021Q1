import { close } from "node:inspector";

export type CssVar = {
  name: string;
  value: string;
}

export abstract class ViewBEM {
  static ViewName: string;

  static bem(element?: string, modificator?: string | string[]): string {
    const mods = Array.isArray(modificator) ? modificator : (modificator ? [modificator] : []);
    const elem = element ? `${this.ViewName}__${element}` : this.ViewName;
    return [elem, ...mods.map(mod => `${elem}--${mod}`)].join(' ');
  }
}
