import { close } from "node:inspector";

export type CssVar = {
  name: string;
  value: string;
}

type Class<T> = new (...args: any[]) => T;

export abstract class ViewBEM {
  static ViewName: string;

  static bem<T extends ViewBEM>(this: Class<T>, element?: string, modificator?: string | string[]): string {
    const self = this as unknown as typeof ViewBEM;
    const mods = Array.isArray(modificator) ? modificator : (modificator ? [modificator] : []);
    const elem = element ? `${self.ViewName}__${element}` : self.ViewName;
    return [elem, ...mods.map(mod => `${elem}--${mod}`)].join(' ');
  }
}
