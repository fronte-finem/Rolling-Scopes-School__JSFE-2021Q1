export const newDiv = (className: string) => newElem('div', className) as HTMLDivElement;
export const newBtn = (className: string) => newElem('button', className) as HTMLButtonElement;
export const newA = (className: string) => newElem('a', className) as HTMLAnchorElement;

export function newElem(tag: string, className: string): HTMLElement {
  const elem = document.createElement(tag);
  elem.className = className;
  return elem;
}

export function newImg(className: string, src: string, alt: string = 'image'): HTMLImageElement {
  const img = newElem('img', className) as HTMLImageElement;
  img.setAttribute('src', src);
  img.setAttribute('alt', alt);
  return img;
}

export function loadImg(className: string, src: string, alt: string = 'image'): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = newImg(className, src, alt);
    img.addEventListener('load', () => resolve(img));
  });
}

export function htmlToElem(template: string): Element {
  const tmp = document.createElement('template');
  tmp.innerHTML = template;
  return tmp.content.firstElementChild;
}
