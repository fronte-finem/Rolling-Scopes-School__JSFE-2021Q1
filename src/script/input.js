import { Observer } from './obsesrver.js'

export { Input }

class Input extends Observer {
  constructor(view, options) {
    super();
    this.view = view;
    this.input = view.querySelector('.input__base');
    this.error = view.querySelector('.input__error-msg');
    this.options = options;
    this.init(options);

    this.input.addEventListener('input', () => {
      this.validate();
      this.dispatch('input', this.input.value);
    });
  }

  onInput(listener) { this.addListener('input', listener) }

  validate() {
    const valid = this.input.checkValidity();
    valid ? this.setValid() : this.setError();
    return valid;
  }

  setValid() { this.view.classList.remove('input--error') }
  setError() {
    this.view.classList.add('input--error');
    if (!this.options || !this.options.errorMsg)
      this.error.textContent = this.input.validationMessage;
  }

  init(options) {
    options && options.limit && (this.input.maxLength = options.limit);
    options && options.pattern && (this.input.pattern = options.pattern);
    options && options.errorMsg && (this.input.title = options.errorMsg);
    options && options.errorMsg && (this.error.textContent = options.errorMsg);
  }
}
