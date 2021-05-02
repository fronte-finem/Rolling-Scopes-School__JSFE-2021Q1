import { Observer } from './obsesrver.js'

export { Popup }

class Popup extends Observer {
  constructor(view) {
    super();
    this.view = view;
  }

  hide() { this.view.classList.add('pop-up--hidden'); }
  show() { this.view.classList.remove('pop-up--hidden'); }

  close() {
    this.hide();
    this.dispatch('close');
  }
  onClose(listener) {
    this.addListener('close', listener);
  }
}
