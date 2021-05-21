import {
  ICreateElementOptions,
  createElement,
  getCssVar,
  setCssVar,
} from '../dom-utils';

export interface IView {
  readonly element: HTMLElement;
  clear(): IView;
  render(childs: IView | IView[]): IView;
  setCssState(state: string, force: boolean): void;
  getCssVar(name: string): string;
  setCssVar(name: string, value: string): void;
  getText(): string | null;
  setText(text: string): void;
  onClick(
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): unknown;
}

export interface ICreateViewOptions extends ICreateElementOptions {
  hookElement?: (elem: HTMLElement) => void;
}

export class View implements IView {
  readonly element: HTMLElement;

  constructor({
    hookElement: hook,
    ...options
  }: ICreateViewOptions) {
    this.element = createElement(options);
    if (hook) {
      hook(this.element);
    }
  }

  getText(): string | null {
    return this.element.textContent;
  }

  setText(text: string): void {
    this.element.textContent = text;
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
