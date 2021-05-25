import {
  ICreateElementOptions,
  createElement,
  getCssVar,
  setCssVar,
  htmlToElem,
} from '../dom-utils';

export interface IView<HTMLElementExtended extends HTMLElement = HTMLElement> {
  readonly element: HTMLElementExtended;
  clear(): IView<HTMLElementExtended>;
  render(
    childs: IView<HTMLElement> | IView<HTMLElement>[]
  ): IView<HTMLElementExtended>;
  setCssState(stateClassName: string, force: boolean): void;
  setCssStateAsync(stateClassName: string, force: boolean): Promise<void>;
  getCssVar(name: string): string;
  setCssVar(name: string, value: string): void;
  setCssStyle<CSSProperty extends keyof CSSStyleDeclaration>(
    cssProperty: CSSProperty,
    value: CSSStyleDeclaration[CSSProperty]
  ): void;
  getText(): string | null;
  setText(text: string): void;
  onClick(
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): unknown;
}

export interface ICreateViewOptions extends ICreateElementOptions {
  childs?: IView | IView[];
  hookElement?: (elem: HTMLElement) => void;
}

export class View<HTMLElementExtended extends HTMLElement = HTMLElement>
  implements IView<HTMLElementExtended>
{
  readonly element: HTMLElementExtended;

  constructor(source: string | ICreateViewOptions) {
    if (typeof source === 'string') {
      this.element = htmlToElem(source) as HTMLElementExtended;
    } else {
      const { childs, hookElement, ...options } = source;
      this.element = createElement(options) as HTMLElementExtended;
      if (childs) this.render(childs);
      if (hookElement) {
        hookElement(this.element);
      }
    }
  }

  static getElemet(x: View | HTMLElement): HTMLElement {
    return x instanceof View ? x.element : x;
  }

  getText(): string | null {
    return this.element.textContent;
  }

  setText(text: string): void {
    this.element.textContent = text;
  }

  clear(): IView<HTMLElementExtended> {
    this.element.innerHTML = '';
    return this;
  }

  render(
    childs: IView<HTMLElement> | IView<HTMLElement>[]
  ): IView<HTMLElementExtended> {
    this.clear();
    if (Array.isArray(childs)) {
      this.element.append(...childs.map((child) => child.element));
    } else {
      this.element.append(childs.element);
    }
    return this;
  }

  setCssState(stateClassName: string, force = true): void {
    this.element.classList.toggle(stateClassName, force);
  }

  setCssStateAsync(stateClassName: string, force = true): Promise<void> {
    this.element.classList.toggle(stateClassName, force);
    return new Promise((resolve) => {
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }

  setCssStyle<CSSProperty extends keyof CSSStyleDeclaration>(
    cssProperty: CSSProperty,
    value: CSSStyleDeclaration[CSSProperty]
  ): void {
    this.element.style[cssProperty] = value;
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
