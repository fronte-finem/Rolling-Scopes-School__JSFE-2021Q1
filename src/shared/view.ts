import { createElement, cssGetVar, cssSetVar, HTMLTag, ICreateElementOptions } from './dom-utils';

export abstract class View<Tag extends HTMLTag = 'div'> {
  protected root: HTMLElementTagNameMap[Tag];

  public getRoot(): HTMLElementTagNameMap[Tag] {
    return this.root;
  }

  public constructor(classNames: string | string[], options?: ICreateElementOptions<Tag>) {
    this.root = createElement<Tag>(classNames, options);
  }

  public setCssState(cssStateClassName: string, force: boolean): void {
    this.root.classList.toggle(cssStateClassName, force);
  }

  public setCssStateAsync(cssStateClassName: string, force: boolean): Promise<void> {
    this.root.classList.toggle(cssStateClassName, force);
    return new Promise((resolve) => {
      this.root.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }

  public getCssVar(name: string): string {
    return cssGetVar(this.root, name);
  }

  public setCssVar(name: string, value: string): void {
    cssSetVar(this.root, name, value);
  }

  public setCssStyle<CSSProperty extends keyof CSSStyleDeclaration>(
    cssProperty: CSSProperty,
    value: CSSStyleDeclaration[CSSProperty]
  ): void {
    this.root.style[cssProperty] = value;
  }

  public onClick(
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.root.addEventListener('click', listener, options);
  }
}
