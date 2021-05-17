import { createElement, getCssVar, setCssVar } from '../dom-utils';
import { ICreateElementOptions } from '../types';

export interface IView {
  readonly element: HTMLElement;
  readonly mapStateStyle: Map<string, string>;
  clear(): IView;
  render(childs: IView | IView[]): IView;
  setCssState(state: string, force: boolean): void;
  getCssVar(name: string): string;
  setCssVar(name: string, value: string): void;
  onClick(
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void
}

export interface ICreateViewOptions extends ICreateElementOptions {
  stateStyle?: [state: string, style: string][];
  hookElement?: (elem: HTMLElement) => void;
}

export default class View implements IView {
  readonly element: HTMLElement;

  readonly mapStateStyle: Map<string, string>;

  constructor({ stateStyle, hookElement: hook, ...options }: ICreateViewOptions) {
    this.element = createElement(options);
    this.mapStateStyle = new Map(stateStyle || []);
    if (hook) {
      hook(this.element);
    }
  }

  clear(): IView {
    this.element.innerHTML = '';
    return this;
  }

  render(childs: IView | IView[]): IView {
    this.clear();
    if (Array.isArray(childs)) {
      this.element.append(...childs.map((child) => child.element));
    } else {
      this.element.append(childs.element);
    }
    return this;
  }

  setCssState(state: string, force = true): void {
    const style = this.mapStateStyle.get(state);
    if (style) this.element.classList.toggle(style, force);
  }

  getCssVar(name: string): string {
    return getCssVar(this.element, name);
  }

  setCssVar(name: string, value: string): void {
    setCssVar(this.element, name, value);
  }

  onClick(
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.element.addEventListener('click', listener, options);
  }
}
