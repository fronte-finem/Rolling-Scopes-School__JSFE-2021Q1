import { CssFilters } from './types.js';

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

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob

export function saveImg(img: HTMLImageElement, filters: CssFilters) {
  const canvas = drawImg(img, filters);

  canvas.toBlob(function(blob) {
    const uri = URL.createObjectURL(blob);

    var link = document.createElement('a');
    link.download = 'download.png';
    link.href = uri;
    link.click();
    // ! ⚠️ prevent memory leak ⚠️
    // no longer need to read the blob so it's revoked
    URL.revokeObjectURL(uri);
  });
}

// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage#understanding_source_element_size

export function drawImg(img: HTMLImageElement, filters: CssFilters) {
  const canvas = document.createElement('canvas');
  const k = img.naturalWidth / img.width;
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  console.log(filters);
  filters['blur'].value *= k;
  const ctx = canvas.getContext('2d');
  const filtersString = Object.entries(filters)
      .map(([name, {value, units}]) => `${name}(${value}${units})`).join(' ');
  console.log(filtersString);
  ctx.filter = filtersString;
  ctx.drawImage(img, 0, 0);
  return canvas;
}

export function htmlToElem(template: string): Element {
  const tmp = document.createElement('template');
  tmp.innerHTML = template;
  return tmp.content.firstElementChild;
}
