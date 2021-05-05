import { Observer } from './obsesrver.js'
import { htmlToElem } from './dom-lib.js'

export { Select }

class Select extends Observer {
  /**
   * @param {HTMLSelectElement} view
   * @param {Map} config
   * @param {string} bemClass
   */
  constructor(view, config, bemClass = 'option') {
    super();
    this.view = view;
    this.init(config, bemClass);
  }

  /**
   * @param {Map} config
   * @param {string} bemClass
   */
  init(config, bemClass) {
    config.forEach((value, key) => {
      /** @type {HTMLOptionElement} */
      const opt = htmlToElem(`<option class="${bemClass}" value="${key}">${value}</option>`);
      this.view.add(opt);
    });
  }

  onSelect(handler) { this.view.addEventListener('input', () => handler(this.view.value)) }
}
