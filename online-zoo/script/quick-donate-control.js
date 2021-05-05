
import { Observer } from './obsesrver.js'

export { QuickDonateControl }

class QuickDonateControl extends Observer {
  constructor(view, minDefaultValue = 10) {
    super();
    this.view = view;
    this.minDefaultValue = minDefaultValue;

    this.initInput();
    this.initBtn();
  }

  submit() { this.dispatch('submit', this.amount) }
  onSubmit(listener) { this.addListener('submit', listener) }

  get amount() { return this.input.value || String(this.minDefaultValue); }

  initBtn() {
    this.btn = this.view.querySelector('.btn');
    this.btn.addEventListener('click', () => this.submit());
  }

  initInput() {
    this.input = this.view.querySelector('.control-donation__input');
    this.input.addEventListener('input', () => {
      if (this.input.value.length < 4) return;
      this.input.value = this.input.value.substring(0,4);
    });
  }
}
