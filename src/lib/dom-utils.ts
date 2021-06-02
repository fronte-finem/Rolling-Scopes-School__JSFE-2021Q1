export type HTMLTag = keyof HTMLElementTagNameMap;

export interface ICreateElementOptions<Tag extends HTMLTag = 'div'> {
  tag?: Tag;
  parent?: HTMLElement;
}

export function createElement<Tag extends HTMLTag = 'div'>(
  classNames: string | string[],
  { tag = 'div' as Tag, parent }: ICreateElementOptions<Tag> = {}
): HTMLElementTagNameMap[Tag] {
  const element = document.createElement(tag);
  element.classList.add(
    ...(Array.isArray(classNames) ? classNames : [classNames])
  );
  if (parent) parent.append(element);
  return element;
}

export function createAnchor(
  classNames: string | string[],
  href: string,
  options?: ICreateElementOptions
): HTMLAnchorElement {
  const a = createElement(classNames, { ...options, tag: 'a' });
  a.setAttribute('href', href);
  return a;
}

export function createImage(
  classNames: string | string[],
  src: string,
  options?: ICreateElementOptions,
  alt = 'Image'
): HTMLImageElement {
  const img = createElement(classNames, { ...options, tag: 'img' });
  img.setAttribute('src', src);
  img.setAttribute('alt', alt);
  return img;
}

export function cssGetVar(element: Element, name: string): string {
  return getComputedStyle(element).getPropertyValue(name);
}

export function cssSetVar(
  element: HTMLElement,
  name: string,
  value: string
): void {
  element.style.setProperty(name, value);
}

const SVG_NAMESPACE_URI = 'http://www.w3.org/2000/svg';

export function createSvgSpriteElement(
  url: string,
  classNames: string | string[]
): SVGSVGElement {
  const svg = document.createElementNS(SVG_NAMESPACE_URI, 'svg');
  const use = document.createElementNS(SVG_NAMESPACE_URI, 'use');
  use.setAttribute('href', url);
  svg.append(use);
  svg.classList.add(...(Array.isArray(classNames) ? classNames : [classNames]));
  return svg;
}

export function htmlToElem(template: string): HTMLElement {
  const tmp = document.createElement('template');
  tmp.innerHTML = template;
  return tmp.content.firstElementChild as HTMLElement;
}
