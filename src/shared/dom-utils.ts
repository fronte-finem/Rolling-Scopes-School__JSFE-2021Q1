import { ICreateElementOptions } from './types';

export function createElement({
  tag = 'div',
  styles = [],
  text,
}: ICreateElementOptions): HTMLElement {
  const element = document.createElement(tag);
  element.classList.add(...styles);
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
