export interface ICreateElementOptions {
  tag?: keyof HTMLElementTagNameMap;
  classNames?: string[];
  text?: string;
}

export function createElement({
  tag = 'div',
  classNames,
  text,
}: ICreateElementOptions): HTMLElement {
  const element = document.createElement(tag);

  if (Array.isArray(classNames)) {
    element.classList.add(...classNames);
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}

export function getCssVar(element: Element, name: string): string {
  return getComputedStyle(element).getPropertyValue(name);
}

export function setCssVar(
  element: HTMLElement,
  name: string,
  value: string
): void {
  element.style.setProperty(name, value);
}

const SVG_NAMESPACE_URI = 'http://www.w3.org/2000/svg';

export function createSvgSpriteElement(
  link: string,
  styles?: string[]
): SVGSVGElement {
  const svg = document.createElementNS(SVG_NAMESPACE_URI, 'svg');
  const use = document.createElementNS(SVG_NAMESPACE_URI, 'use');
  use.setAttribute('href', link);
  svg.append(use);

  svg.classList.add('svg-icon');
  if (Array.isArray(styles)) {
    svg.classList.add(...styles);
  }
  return svg;
}

export function htmlToElem(template: string): HTMLElement {
  const tmp = document.createElement('template');
  tmp.innerHTML = template;
  return tmp.content.firstElementChild as HTMLElement;
}

export function cropResize(img: HTMLImageElement, cropSize: number): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // crop to center
  const imgSize = Math.min(img.width, img.height);
  const dx = (img.width - imgSize) / 2;
  const dy = (img.height - imgSize) / 2;

  ctx.canvas.width = cropSize;
  ctx.canvas.height = cropSize;
  ctx.drawImage(img, dx, dy, imgSize, imgSize, 0, 0, cropSize, cropSize);

  return canvas.toDataURL();
}
