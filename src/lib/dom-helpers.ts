export const newDiv = (className: string) => newElem('div', className) as HTMLDivElement;
export const newBtn = (className: string) => newElem('button', className) as HTMLButtonElement;
export const newA = (className: string) => newElem('a', className) as HTMLAnchorElement;

export function newElem(tag: string, className: string): HTMLElement {
  const elem = document.createElement(tag);
  elem.className = className;
  return elem;
}
