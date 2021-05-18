import { ICreateElementOptions } from './types';

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

export function createElement({
  tag = 'div',
  styles,
  text,
}: ICreateElementOptions): HTMLElement {
  const element = document.createElement(tag);

  if (Array.isArray(styles)) {
    element.classList.add(...styles);
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}

export function createElements(
  options: ICreateElementOptions[]
): HTMLElement[] {
  return options.map((param) => createElement(param));
}

export interface IWrappedElements {
  outer: HTMLElement;
  inner: HTMLElement;
}

export function wrappingElements(elements: HTMLElement[]): IWrappedElements {
  const outer = elements[0];

  const inner = elements.reduce((acc, elem) => {
    acc.append(elem);
    return elem;
  });

  return { outer, inner };
}

const SVG_NAMESPACE_URI = 'http://www.w3.org/2000/svg';

export function createSvgSpriteElement(link: string, styles?: string[]): SVGSVGElement {
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
