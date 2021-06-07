import { createElement, cssGetVar, cssSetVar, HTMLTag, ICreateElementOptions } from './dom-utils';

export abstract class View<
  Model,
  Tag extends HTMLTag = 'div',
  CssStateClassNameEnum extends string = string,
  CssVarNameEnum extends string = string
> {
  protected root: HTMLElementTagNameMap[Tag];

  public getRoot(): HTMLElementTagNameMap[Tag] {
    return this.root;
  }

  public constructor(classNames: string | string[], options?: ICreateElementOptions<Tag>) {
    this.root = createElement<Tag>(classNames, options);
  }

  protected hookDestroy(): boolean {
    return !this;
  }

  public destroy(): void {
    if (this.hookDestroy()) return;
    this.root.innerHTML = '';
  }

  protected abstract init(): void;

  public abstract update(model: Model): void;

  public setCssState(cssStateClassName: CssStateClassNameEnum, force: boolean): void {
    this.root.classList.toggle(cssStateClassName, force);
  }

  public setCssStateAsync(cssStateClassName: CssStateClassNameEnum, force: boolean): Promise<void> {
    this.root.classList.toggle(cssStateClassName, force);
    return new Promise((resolve) => {
      this.root.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }

  public getCssVar(name: CssVarNameEnum): string {
    return cssGetVar(this.root, name);
  }

  public setCssVar(name: CssVarNameEnum, value: string): void {
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
