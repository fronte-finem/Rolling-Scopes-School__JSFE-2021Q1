import {
  createElement,
  getCssVar,
  htmlToElem,
  ICreateElementOptions,
  setCssVar,
} from '../dom-utils';

export interface ICreateViewOptions extends ICreateElementOptions {
  childs?: View | View[];
  hookElement?: (elem: HTMLElement) => void;
}

export class View<HTMLElementExtended extends HTMLElement = HTMLElement> {
  public readonly element: HTMLElementExtended;

  public constructor(source: string | ICreateViewOptions) {
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

  public getText(): string | null {
    return this.element.textContent;
  }

  public setText(text: string): void {
    this.element.textContent = text;
  }

  public clear(): View<HTMLElementExtended> {
    this.element.innerHTML = '';
    return this;
  }

  public render(
    childs: View<HTMLElement> | View<HTMLElement>[]
  ): View<HTMLElementExtended> {
    this.clear();
    if (Array.isArray(childs)) {
      this.element.append(...childs.map((child) => child.element));
    } else {
      this.element.append(childs.element);
    }
    return this;
  }

  public setCssState(stateClassName: string, force = true): void {
    this.element.classList.toggle(stateClassName, force);
  }

  public setCssStateAsync(stateClassName: string, force = true): Promise<void> {
    this.element.classList.toggle(stateClassName, force);
    return new Promise((resolve) => {
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }

  public setCssStyle<CSSProperty extends keyof CSSStyleDeclaration>(
    cssProperty: CSSProperty,
    value: CSSStyleDeclaration[CSSProperty]
  ): void {
    this.element.style[cssProperty] = value;
  }

  public getCssVar(name: string): string {
    return getCssVar(this.element, name);
  }

  public setCssVar(name: string, value: string): void {
    setCssVar(this.element, name, value);
  }

  public onClick(
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.element.addEventListener('click', listener, options);
  }
}
