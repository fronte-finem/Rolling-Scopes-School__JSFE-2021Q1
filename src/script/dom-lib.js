export { htmlToElem, newElem, newDiv, newBtn }

const newDiv = newElem.bind(null, 'div');
const newBtn = newElem.bind(null, 'button');

function newElem(tag, className, parent) {
  const elem = document.createElement(tag);
  elem.className = className;
  parent && parent.append(elem);
  return elem;
}

function htmlToElem(template) {
  const tmp = document.createElement('template');
  tmp.innerHTML = template;
  return tmp.content.firstElementChild;
}
