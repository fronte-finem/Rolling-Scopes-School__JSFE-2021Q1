import {
  createElement,
  cssGetVar,
  cssSetVar,
  HTMLTag,
  ICreateElementOptions,
} from 'lib/dom-utils';

export type RenderOptions =
  | string
  | HTMLElement
  | View
  | Array<HTMLElement | View>;

export class View<
  Tag extends HTMLTag = 'div',
  CssStateClassNameEnum extends string = string,
  CssVarNameEnum extends string = string
> {
  public readonly root: HTMLElementTagNameMap[Tag];

  public constructor(
    classNames: string | string[],
    options?: ICreateElementOptions<Tag>
  ) {
    this.root = createElement<Tag>(classNames, options);
  }

  protected overrideDestroy?: () => boolean;

  public destroy(): void {
    if (this.overrideDestroy?.()) return;
    this.root.innerHTML = '';
  }

  protected overrideRender?: (param: RenderOptions) => boolean;

  public render(param: RenderOptions): void {
    if (this.overrideRender?.(param)) return;
    if (typeof param === 'string') {
      this.root.innerHTML = param;
      return;
    }
    const array = !Array.isArray(param) ? [param] : param;
    this.root.append(...array.map((x) => (x instanceof View ? x.root : x)));
  }

  public setCssState(
    cssStateClassName: CssStateClassNameEnum,
    force: boolean
  ): void {
    this.root.classList.toggle(cssStateClassName, force);
  }

  public setCssStateAsync(
    cssStateClassName: CssStateClassNameEnum,
    force: boolean
  ): Promise<void> {
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
