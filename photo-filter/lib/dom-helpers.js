export const newDiv = (className) => newElem('div', className);
export const newBtn = (className) => newElem('button', className);
export const newA = (className) => newElem('a', className);
export function newElem(tag, className) {
  const elem = document.createElement(tag);
  elem.className = className;
  return elem;
}
export function htmlToElem(template) {
  const tmp = document.createElement('template');
  tmp.innerHTML = template;
  return tmp.content.firstElementChild;
}
export function newImg(className, src, alt = 'image') {
  const img = newElem('img', className);
  img.setAttribute('crossOrigin', 'anonymous');
  img.setAttribute('src', src);
  img.setAttribute('alt', alt);
  return img;
}
export function loadImg(className, src, alt = 'image') {
  return new Promise((resolve) => {
    const img = newImg(className, src, alt);
    img.addEventListener('load', () => resolve(img));
  });
}
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
export function saveImg(img, filters) {
  const canvas = drawImg(img, filters);
  canvas.toBlob(function (blob) {
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
export function drawImg(img, filters) {
  const canvas = document.createElement('canvas');
  const k = img.naturalWidth / img.width;
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  console.log(filters);
  filters['blur'].value *= k;
  const ctx = canvas.getContext('2d');
  const filtersString = Object.entries(filters)
    .map(([name, { value, units }]) => `${name}(${value}${units})`)
    .join(' ');
  console.log(filtersString);
  ctx.filter = filtersString;
  ctx.drawImage(img, 0, 0);
  return canvas;
}
