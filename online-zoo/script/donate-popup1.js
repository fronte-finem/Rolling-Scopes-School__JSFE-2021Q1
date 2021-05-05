import { Popup } from './base-popup.js'

export { Popup1 };

class Popup1 extends Popup {
  constructor(view) {
    super(view)
    this.initBtnClose();
    this.initAmountSelector();
  }

  submit(value) { this.dispatch('submit', value); }
  onSubmit(listener) { this.addListener('submit', listener); }

  initBtnClose() {
    const btn = this.view.querySelector('.pop-up-first__btn-close');
    btn.addEventListener('click', () => this.close());
    return btn;
  }

  initAmountSelector() {
    const btns = this.view.querySelectorAll('.pop-up-first__btn');
    [...btns].forEach(btn => btn.addEventListener('click', () => this.submit(btn.dataset.amount)));
    return btns;
  }
}
