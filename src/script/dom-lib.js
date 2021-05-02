export { htmlToElem, newElem, newDiv, newBtn, getCssVar, setCssVar }

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

function getCssVar(element, name) {
  return getComputedStyle(element).getPropertyValue(name);
}

function setCssVar(element, name, value) {
  element.style.setProperty(name, value);
}
