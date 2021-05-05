import { Observer } from './obsesrver.js'

export { Modal }

class Modal extends Observer {
  constructor(view) {
    super();
    this.view = view;

    this.view.addEventListener('click', (e) => {
      if(e.target !== this.view) return;
      this.hide();
      this.dispatch('close');
    })
  }

  onClose(listener) { this.addListener('close', listener) }

  hide() {
    document.body.classList.remove('modal-mode');
    this.view.classList.add('modal--hidden');
  }
  show() {
    document.body.classList.add('modal-mode');
    this.view.classList.remove('modal--hidden');
  }
}
