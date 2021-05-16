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
