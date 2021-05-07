export { DomUtils }

class DomUtils {
  /**
   * @param {Element} element
   * @param {string} name     - css variable name
   * @returns {string}
   */
  static getCssVar(element, name) {
    return getComputedStyle(element).getPropertyValue(name);
  }

  /**
   * @param {HTMLElement} element
   * @param {string} name     - css variable name
   * @param {string} value    - css variable name
   * @returns {void}
   */
  static setCssVar(element, name, value) {
    element.style.setProperty(name, value);
  }

  /**
   * @param {string} tag
   * @param {string} className
   * @param {Element} parent
   * @returns {Element}
   */
   static newElem(tag, className, parent) {
    const elem = document.createElement(tag);
    elem.className = className;
    parent && parent.append(elem);
    return elem;
  }

  /**
   * @param {string} template
   * @returns {Element}
   */
  static htmlToElem(template) {
    const tmp = document.createElement('template');
    tmp.innerHTML = template;
    return tmp.content.firstElementChild;
  }

  /**
   * @param {number} num
   * @param {Element} parent
   * @returns {Node[]}
   */
  static cloneFirstChilds(num, parent) {
    return DomUtils
      .getFirstChilds(num, [parent.firstElementChild])
      .map(slot => slot.cloneNode(true));
  }

  /**
   * @param {number} num
   * @param {Element} parent
   * @returns {Node[]}
   */
  static cloneLastChilds(num, parent) {
    return DomUtils
      .getLastChilds(num, [parent.lastElementChild])
      .map(slot => slot.cloneNode(true));
  }

  /**
   * @param {number} num
   * @param {Element[]} acc
   * @returns {Element[]}
   */
  static getFirstChilds(num, acc) {
    if (num <= 1) return acc;
    const elem = acc[acc.length - 1];
    acc.push(elem.nextElementSibling);
    return DomUtils.getFirstChilds(num - 1, acc);
  }

  /**
   * @param {number} num
   * @param {Element[]} acc
   * @returns {Element[]}
   */
  static getLastChilds(num, acc) {
    if (num <= 1) return acc;
    const elem = acc[0];
    acc.unshift(elem.previousElementSibling);
    return DomUtils.getLastChilds(num - 1, acc);
  }
}
