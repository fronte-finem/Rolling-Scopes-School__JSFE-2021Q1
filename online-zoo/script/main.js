class Observer {
  constructor() {
    this.listeners = new Map();
  }

  addListener(type, listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type).push(listener);
  }

  delListener(type, listener) {
    if (!this.listeners.has(type)) return;
    this.listeners.set(type, this.listeners.get(type).filter(func => func !== listener));
  }

  dispatch(type, data, context) {
    if (!this.listeners.has(type)) return;
    this.listeners.get(type).forEach((listener) => listener.call(context, data));
  }

}

class Modal extends Observer {
  constructor(view) {
    super();
    this.view = view;

    this.view.addEventListener('click', (e) => {
      if(e.target !== this.view) return;
      this.hide();
      this.dispatch('close');
    });
  }

  onClose(listener) { this.addListener('close', listener); }

  hide() {
    document.body.classList.remove('modal-mode');
    this.view.classList.add('modal--hidden');
  }
  show() {
    document.body.classList.add('modal-mode');
    this.view.classList.remove('modal--hidden');
  }
}

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

class Popup1 extends Popup {
  constructor(view) {
    super(view);
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

class CreditCard {
  _yearsLimit = 6;
  _number = '';
  _cvv = '';
  _month = '';
  _year = '';

  constructor() {}

  get number() { return this._number }
  get cvv() { return this._cvv }
  get month() { return this._month }
  get year() { return this._year }

  setNumber(value) { return (this._number = value) && this.validateNumber() }
  setCvv(value) { return (this._cvv = value) && this.validateCvv() }
  setMonth(value) { return (this._month = value) && this.validateMonth() }
  setYear(value) { return (this._year = value) && this.validateYear() }

  validate() {
    return this.validateNumber()
        && this.validateCvv()
        && this.validateMonth()
        && this.validateYear();
  }

  validateNumber() { return /\d{16}/.test(this._number) }
  validateCvv() { return /\d{3}/.test(this._cvv) }
  validateMonth() { return /0[1-9]|1[0-2]/.test(this._month) }
  validateYear() { return this.validYears.has(Number(this._year)) }

  get validYears() {
    const year = new Date().getFullYear();
    const initArr = Array.from({length: this._yearsLimit});
    return new Map(initArr.map((_, i) => [year + i, String(year + i)]));
  }

  get initMonths() {
    return Array.from({length: 12}).map((_, i) => i + 1);
  }

  formatMonth(num) {
    return String(num).padStart(2, '0');
  }

  prettyMonth(num) {
    return new Date(0, num - 1).toLocaleString('default', { month: 'long' });
  }

  get validMonths() {
    return new Map(this.initMonths.map((i) => [i, this.formatMonth(i)]));
  }

  get prettyMonths() {
    return new Map(this.initMonths.map((i) => [this.formatMonth(i), `${this.formatMonth(i)} ▪️ ${this.prettyMonth(i)}`]));
  }
}

const petsData = getPetsData();

/** @typedef {Map<string, string>} PetsData
 *
 * @returns {PetsData}
*/
function getPetsData() {
  return new Map([
      ['panda',     'Lukas the Panda'],
      ['lemur',     'Andy the Lemur'],
      ['gorilla',   'Glen the Gorilla'],
      ['alligator', 'Mike the Alligator'],
      ['eagle',     'Sam & Lora the eagles family'],
      ['koala',     'Liz the Koala'],
      ['lion',      'Shake the Lion'],
      ['tiger',     'Senja the Tiger'],
  ]);
}

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

  onInput(listener) { this.addListener('input', listener); }

  validate() {
    const valid = this.input.checkValidity();
    valid ? this.setValid() : this.setError();
    return valid;
  }

  setValid() { this.view.classList.remove('input--error'); }
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
      const opt = DomUtils.htmlToElem(`<option class="${bemClass}" value="${key}">${value}</option>`);
      this.view.add(opt);
    });
  }

  onSelect(handler) { this.view.addEventListener('input', () => handler(this.view.value)); }
}

/** @typedef {import('./pets-config.js').PetsData} PetsData */

class Popup2Utils {
  static activateBtn(btn) { btn.classList.add('pop-up-second__btn--active'); }
  static deactivateBtn(btn) { btn.classList.remove('pop-up-second__btn--active'); }
  static deactivateAllBtn(btns) { btns.forEach(btn => Popup2Utils.deactivateBtn(btn)); }

  static hideBtn(btn) { btn.classList.add('btn--hidden'); }
  static showBtn(btn) { btn.classList.remove('btn--hidden'); }

  static hideStep(step) { step.classList.add('pop-up-second__step--hidden'); }
  static showStep(step) { step.classList.remove('pop-up-second__step--hidden'); }

  static addStepNum(popup, stepNum) { popup.classList.add(`pop-up-second--step-${stepNum}`); }
  static delStepNum(popup, stepNum) { popup.classList.remove(`pop-up-second--step-${stepNum}`); }
}

class Popup2 extends Popup {
  constructor(view) {
    super(view);

    this.doneTimerId = null;

    /**@type HTMLFormElement */
    this.initForm(view.querySelector('.pop-up-second__form'));

    this.initBtnNext(this.view.querySelector('.btn--next'));
    this.initBtnBack(this.view.querySelector('.pop-up-second__btn-back'));
    this.initBtnDone(this.view.querySelector('.btn--complete'));

    const onValidate = (valid) => valid ? this.activateNextStepBtn() : this.deactivateNextStepBtn();

    /** @type {AbstractPopup2Step[]} */
    this.steps = [
      new Popup2Step1(view.querySelector('.pop-up-second__step--1'), onValidate, petsData),
      new Popup2Step2(view.querySelector('.pop-up-second__step--2'), onValidate),
      new Popup2Step3(view.querySelector('.pop-up-second__step--3'), onValidate, new CreditCard()),
      new Popup2Step4(view.querySelector('.pop-up-second__step--4'), onValidate),
    ];
    this.nextStepAllowed = false;
    this.stepNum = 0;
    this.activateStep();
    this.steps[3].onClose(() => this.close());
  }

  setAmount(value) { this.steps[0].setAmount(value); }

  activateStep() {
    Popup2Utils.addStepNum(this.view, this.stepNum + 1);
    this.step = this.steps[this.stepNum];
    this.step.startWatch();
    this.step.show();
    Popup2Utils.hideBtn(this.stepNum < 2 ? this.btnDone : this.btnNext);
    Popup2Utils.showBtn(this.stepNum < 2 ? this.btnNext : this.btnDone);
    this.step.validate() || this.deactivateNextStepBtn();
  }
  deactivateStep() {
    Popup2Utils.delStepNum(this.view, this.stepNum + 1);
    this.step.stopWatch();
    this.step.hide();
  }

  activateNextStepBtn() {
    this.nextStepAllowed = true;
    if (this.stepNum < 2) {
      Popup2Utils.activateBtn(this.btnNext);
    } else {
      this.btnDone.disabled = false;
    }
  }
  deactivateNextStepBtn() {
    this.nextStepAllowed = false;
    if (this.stepNum < 2) {
      Popup2Utils.deactivateBtn(this.btnNext);
    } else {
      this.btnDone.disabled = true;
    }
  }

  stepNext() {
    if (!this.nextStepAllowed) {
      this.stepNum === 0 ? this.step.validateForce() : this.step.validate();
      return;
    }
    this.deactivateStep();
    this.stepNum++;
    this.activateStep();
  }

  stepBack() {
    this.deactivateStep();
    this.stepNum--;
    this.activateStep();
    this.activateNextStepBtn();
  };

  initForm(form) {
    this.form = form;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      new FormData(this.form);
    }, true);
    form.addEventListener('formdata', (e) => {
      console.log('Form data:');
      for (const [key, value] of e.formData) console.log(`\t${key}: ${value}`);
    });
  }

  close() {
    if (this.stepNum === 3 || this.doneTimerId) {
      clearTimeout(this.doneTimerId);
      this.doneTimerId = null;
      this.form.requestSubmit();
    }
    this.reset();
    super.close();
  }

  reset() {
    this.deactivateStep();
    this.form.reset();
    this.steps.forEach(step => step.reset());
    this.stepNum = 0;
    this.activateStep();
  }

  submit() {
    this.doneTimerId = setTimeout(() => this.close(), 5000);
  }

  initBtnNext(btn) {
    this.btnNext = btn;
    btn.addEventListener('click', () => this.stepNext());
  }

  initBtnBack(btn) {
    this.btnBack = btn;
    btn.addEventListener('click', () => this.stepBack());
  }

  initBtnDone(btn) {
    this.btnDone = btn;
    btn.disabled = true;
    btn.addEventListener('click', () => {
      if (!this.step.validateForce()) return;
      this.stepNext();
      this.submit();
    });
  }
}



class AmountSelector extends Observer {
  /**
   * @param {NodeList} btns
   */
  constructor(btns) {
    super();
    this.selector = [...btns].reduce((acc, btn) => acc.set(btn.dataset.amount, btn), new Map());
    this.init();
  }

  init() {
    this.selector.forEach(btn => btn.addEventListener('click', () => {
      this.dispatch('Selected', btn.dataset.amount);
      this.reset();
      Popup2Utils.activateBtn(btn);
    }));
  }

  activate(amount) {
    if (!this.selector.has(amount)) return false;
    this.reset();
    Popup2Utils.activateBtn(this.selector.get(amount));
    return true;
  }

  reset() { Popup2Utils.deactivateAllBtn(this.selector); }

  onSelected(listener) { this.addListener('Selected', listener); }
}

class AbstractPopup2Step extends Observer {
  /**
   * @param {HTMLElement} view
   * @param {(valid: boolean) => void} listener
   */
  constructor(view, listener, ...args) {
    super();
    this.view = view;
    this.listener = listener;
  }

  init() { throw new Error('Method not implemented.') }

  hide() { Popup2Utils.hideStep(this.view); }
  show() { Popup2Utils.showStep(this.view); }

  validate() { return true; }
  reset() { this.hide(); }

  startWatch() { this.addListener('Validate', this.listener); }
  stopWatch() { this.delListener('Validate', this.listener); }
}

class Popup2Step1 extends AbstractPopup2Step {
  /**
   * @param {HTMLElement} view
   * @param {(valid: boolean) => void} listener
   * @param {PetsData} petsData
   */
  constructor(view, listener, petsData) {
    super(view, listener);
    this.amount = 0;
    this.choosedPet = '';
    this.petsData = petsData;
    this.init();
  }

  init() {
    this.amountSelector = new AmountSelector(this.view.querySelectorAll('.pop-up-second__amount-selector .pop-up-second__btn'));
    this.initAmountResetBtn(this.view.querySelector('.pop-up-second__btn--reset-amount'));
    this.initAmountInput(this.view.querySelector('.pop-up-second__amount-input'));

    this.initPetsResetBtn(this.view.querySelector('.pop-up-second__btn--reset-pets'));
    this.initPetsSelect(this.view.querySelector('.pop-up-second__select-pet'));

    this.btns = [this.amountResetBtn, this.petsResetBtn];
    this.amountSelector.onSelected((value) => {
      Popup2Utils.deactivateBtn(this.amountResetBtn);
      this.amount = Number(value);
      this.amountInput.value = value;
    });
  }

  validateForce() {
    return this.amountInput.reportValidity()
        && this.petsSelect.reportValidity();
  }

  validate() {
    const valid = this.amount > 0
               && this.amountInput.checkValidity()
               && this.petsSelect.checkValidity();
    this.dispatch('Validate', valid);
    return valid;
  }

  reset() {
    super.reset();
    this.resetAmount();
    Popup2Utils.deactivateAllBtn(this.btns);
  }

  setAmount(value) {
    if (!value) {
      this.resetAmount();
      return;
    }
    this.amount = Number(value);
    this.amountInput.value = value;
    this.amountSelector.activate(value);
    this.validate();
  }

  resetAmount() {
    this.amountSelector.reset();
    Popup2Utils.deactivateAllBtn(this.btns);
    Popup2Utils.activateBtn(this.amountResetBtn);
    this.amount = 0;
    this.amountInput.value = '';
    this.amountInput.focus();
  }

  initAmountResetBtn(btn) {
    this.amountResetBtn = btn;
    btn.addEventListener('click', () => this.resetAmount());
  }

  initAmountInput(input) {
    this.amountInput = input;
    this.setInputLimit(input, 4);
    input.addEventListener('input', () => {
      Popup2Utils.deactivateAllBtn(this.btns);
      this.amountSelector.reset();
      this.setAmount(input.value);
    });
  }

  setInputLimit(input, limit) {
    input.addEventListener('input', () => {
      if (input.value.length < limit) return;
      input.value = input.value.substring(0, limit);
    });
  }

  initPetsResetBtn(btn) {
    this.petsResetBtn = btn;
    btn.addEventListener('click', () => {
      Popup2Utils.deactivateAllBtn(this.btns);
      Popup2Utils.activateBtn(btn);
      this.petsSelect.selectedIndex = this.choosedPet;
      this.validate();
    });
  }

  initPetsSelect(view) {
    this.petsSelect = view;
    new Select(view, this.petsData, 'pop-up-second__option')
      .onSelect((value) => {
        this.choosedPet = this.petsSelect.selectedIndex;
        this.validate();
      });
  }
}

class Popup2Step2 extends AbstractPopup2Step {
  /**
   * @param {HTMLElement} view
   * @param {(valid: boolean) => void} listener
   */
  constructor(view, listener) {
    super(view, listener);
    this.init();
  }

  init() {
    this.nameInput = new Input(this.view.querySelector('.pop-up-second__input-name'));
    this.emailInput = new Input(this.view.querySelector('.pop-up-second__input-email'));
    this.nameInput.onInput(() => this.validate());
    this.emailInput.onInput(() => this.validate());
  }

  validate() {
    const valid = this.nameInput.validate()
               && this.emailInput.validate();
    this.dispatch('Validate', valid);
    return valid;
  }

  reset() {
    super.reset();
    this.nameInput.setValid();
    this.emailInput.setValid();
  }
}

class Popup2Step3 extends AbstractPopup2Step {
  /**
   * @param {HTMLElement} view
   * @param {(valid: boolean) => void} listener
   * @param {CreditCard} creditCard
   */
  constructor(view, listener, creditCard) {
    super(view, listener);
    this.creditCard = creditCard;
    this.init();
  }

  init() {
    this.initCardNumberInput(this.view.querySelector('.pop-up-second__input-card'), 16);
    this.initCardCvvInput(this.view.querySelector('.pop-up-second__input-cvv'), 3);
    this.initMonthSelect(this.view.querySelector('.pop-up-second__select-month'));
    this.initYearSelect(this.view.querySelector('.pop-up-second__select-year'));
  }

  validate() {
    const valid = this.cardNumberInput.validate()
               && this.cardCvvInput.validate()
               && this.monthSelect.checkValidity()
               && this.yearSelect.checkValidity()
               && this.creditCard.validate();
    this.dispatch('Validate', valid);
    return valid;
  }

  validateForce() {
    return this.cardNumberInput.validate()
        && this.cardCvvInput.validate()
        && this.monthSelect.reportValidity()
        && this.yearSelect.reportValidity()
        && this.creditCard.validate();
  }

  reset() {
    super.reset();
    this.cardNumberInput.setValid();
    this.cardCvvInput.setValid();
  }

  generateConfig(limit) {
    return {
      limit: limit,
      pattern: `\\d{${limit}}`,
      errorMsg: `must contain ${limit} digits`,
    };
  }

  initCardNumberInput(view, limit = 16) {
    this.cardNumberInput = new Input(view, this.generateConfig(limit));
    this.cardNumberInput.onInput((value) => {
      this.creditCard.setNumber(value);
      this.validate();
    });
  }

  initCardCvvInput(view, limit = 3) {
    this.cardCvvInput = new Input(view, this.generateConfig(limit));
    this.cardCvvInput.onInput((value) => {
      this.creditCard.setCvv(value);
      this.validate();
    });
  }

  initMonthSelect(view) {
    this.monthSelect = view;
    new Select(view, this.creditCard.prettyMonths, 'pop-up-second__option')
      .onSelect((value) => {
        this.creditCard.setMonth(value);
        this.validate();
      });
  }

  initYearSelect(view) {
    this.yearSelect = view;
    new Select(view, this.creditCard.validYears, 'pop-up-second__option')
      .onSelect((value) => {
        this.creditCard.setYear(value);
        this.validate();
      });
  }
}

class Popup2Step4 extends AbstractPopup2Step {
  /**
   * @param {HTMLElement} view
   * @param {(valid: boolean) => void} listener
   */
  constructor(view, listener) {
    super(view, listener);
    this.init();
  }

  init() {
    this.initBtnClose(this.view.querySelector('.pop-up-first__btn-close'));
  }

  initBtnClose(btn) {
    this.btnClose = btn;
    btn.addEventListener('click', () => this.dispatch('Close'));
  }

  onClose(listener) { this.addListener('Close', listener); }
}

class QuickDonateControl extends Observer {
  constructor(view, minDefaultValue = 10) {
    super();
    this.view = view;
    this.minDefaultValue = minDefaultValue;

    this.initInput();
    this.initBtn();
  }

  submit() { this.dispatch('submit', this.amount); }
  onSubmit(listener) { this.addListener('submit', listener); }

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

class DonateApp extends Observer {
  constructor(modal, popup1, popup2, step0Btns, quickDonateControlView) {
    super();
    this.modal = modal;
    this.popup1 = popup1;
    this.popup2 = popup2;
    this.quickDonateControl = quickDonateControlView && new QuickDonateControl(quickDonateControlView);

    modal.onClose(() => [popup1, popup2].forEach(p => p.close()));

    [popup1, popup2].forEach(popup => popup.onClose(() => this.modal.hide()));

    step0Btns.forEach(btn => btn.addEventListener('click', () => this.step0()));

    popup1.onSubmit((value) => this.step1(value));

    this.quickDonateControl?.onSubmit((value) => this.step1(value));
  }

  step0() {
    console.log(this);
    this.modal.show();
    this.popup1.show();
  }

  step1(value) {
    this.modal.show();
    this.popup1.hide();
    this.popup2.show();
    this.popup2.setAmount(value);
  }
}

/**
 * @typedef SliderConfig
 * @type {object}
 * @property {HTMLButtonElement} btnPrev     - button previous
 * @property {HTMLButtonElement} btnNext     - button next
 * @property {HTMLElement} slots       - slots container
 * @property {string} cssVarMoveSlots  - css-variable for set slots index
 */

class Slider extends Observer {
  /**
   * @param {HTMLElement} view
   * @param {SliderConfig} config
   * @param {number} moveNum
   */
  constructor(view, {btnPrev, btnNext, slots, cssVarMoveSlots}, moveNum = 3) {
    super();
    this.view = view;
    this._moveNum = moveNum;
    this.step = 0;
    this.isMoving = false;

    this.btnPrev = btnPrev;
    this.btnNext = btnNext;
    this.slots = slots;
    this.cssVarMoveSlots = cssVarMoveSlots;

    this.btnPrev.addEventListener('click', () => this.moveLeft());
    this.btnNext.addEventListener('click', () => this.moveRight());
  }

  moveLeft() { this.move(-this.calcMoveNum()); }
  moveRight() { this.move(this.calcMoveNum()); }

  /**
   * @param {number} num
   */
  move(num) {
    this.step += num;
    this.correction();
    DomUtils.setCssVar(this.view, this.cssVarMoveSlots, String(this.step));
  }

  correction() {}

  calcMoveNum() { return this._moveNum }
}

class LimitedSlider extends Slider {
  /**
   * @param {HTMLElement} view
   * @param {SliderConfig} config
   */
  constructor(view, config, moveNum = 3) {
    super(view, config, moveNum);
    this.correction();
  }

  correction() {
    const limit = this.calcLimit();

    if (this.step >= 0) {
      this.step = 0;
      this.btnNext.disabled = true;
    }
    else if (this.step <= limit) {
      this.step = limit;
      this.btnPrev.disabled = true;
    } else {
      this.btnNext.disabled = false;
      this.btnPrev.disabled = false;
    }
  }

  calcLimit() { return -1 * (this.slots.childElementCount - this.calcSlotsOnPage()); }

  calcSlotsOnPage() {
    const sliderWidth = this.slots.getClientRects()[0].width;
    const slotWidth = this.slots.firstElementChild.getClientRects()[0].width;
    return Math.floor(sliderWidth / slotWidth);
  }

  calcMoveNum() { return Math.min(this._moveNum, this.calcSlotsOnPage()) }
}

/**
 * @typedef {import('./base-slider.js').SliderConfig} SliderConfig
 *
 * @typedef {SliderConfig & Addon} PetsSliderConfig
 *
 * @typedef {object} Addon
 * @property {string} cssVarPageCols  - css-variable for set slots index
 * @property {string} cssVarSlotCols  - css-variable for set slots index
 */

class PetsSlider extends LimitedSlider {
  /**
   * @param {HTMLElement} view
   * @param {PetsSliderConfig} petsSliderConfigfig
   */
  constructor(view, {cssVarPageCols, cssVarSlotCols, ...config}, moveNum = 3) {
    super(view, config, moveNum);
    this.cssVarPageCols = cssVarPageCols;
    this.cssVarSlotCols = cssVarSlotCols;
    this.correction();
  }

  calcSlotsOnPage() {
    const pageCols = +DomUtils.getCssVar(this.view, this.cssVarPageCols);
    const slotCols = +DomUtils.getCssVar(this.view, this.cssVarSlotCols);
    return pageCols / slotCols;
  }

  calcMoveNum() { return Math.min(this._moveNum, this.calcSlotsOnPage()) }
}

/**
 * @typedef {import('./base-slider.js').SliderConfig} SliderConfig
 *
 * @typedef {SliderConfig & Addon} TestimonialsSliderConfig
 *
 * @typedef {object} Addon
 * @property {NodeListOf<Element>} rows        - all slots containers
 * @property {string} cssClassTransition       - css-class for toggle transition animation
 * @property {number} [autoMoveTime = 3]       - time interval for auto-move
 * @property {number} [pauseAutoMoveTime = 10] - time interval for pause auto-move
 */

class TestimonialsSlider2 extends Slider {
  /**
   * @param {HTMLElement} view
   * @param {TestimonialsSliderConfig} testimonialsSliderConfig
   */
  constructor(view, {rows, cssClassTransition, autoMoveTime = 3, pauseAutoMoveTime = 10, ...config}) {
    super(view, config, 1);
    this.autoTime = autoMoveTime;
    this.pauseTime = pauseAutoMoveTime;
    this.autoTimeDefault = autoMoveTime;
    this.pauseTimeDefault = pauseAutoMoveTime;
    this.autoTimeTest = 3;
    this.pauseTimeTest = 10;
    this.timeCounter = 0;
    this.maxTime = autoMoveTime;
    this.timer = null;
    this.pause = null;
    this.cssClassTransition = cssClassTransition;
    this.slotsCloneNum = 3;
    this.slotsNum = this.slots.childElementCount + 1;
    /** @type {NodeListOf<Element>} */
    this.rows = rows;
    this.initSlots(this.slotsCloneNum);
    this.initProgress();
    this.initSwitch();

    this.mainTimer = setInterval(() => this.updateCounter(), 1000);
    this.resetTimer();

    this.moveTimeout = null;

    this.btnPrev.addEventListener('click', () => this.pauseAutoMove());
    this.btnNext.addEventListener('click', () => this.pauseAutoMove());

  }

  resetTimer() {
    this.timeCounter = 0;
    this.updateProgressMaxTime();
    this.updateProgressTime();
  }

  pauseAutoMove() {
    this.maxTime = this.pauseTime;
    this.resetTimer();
  }

  updateCounter() {
    this.timeCounter = (this.timeCounter + 1) % (this.maxTime + 1);
    this.updateProgressTime();
    if (this.timeCounter === 0) {
      if (this.maxTime === this.pauseTime) {
        this.maxTime = this.autoTime;
        this.updateProgressMaxTime();
      }
    } else if (this.timeCounter === this.maxTime) {
      this.moveLeft();
    }
  }

  initSlots(cloneNum) {
    this.rows.forEach((row) => {
      const firsts = DomUtils.cloneFirstChilds(cloneNum, row);
      const lasts = DomUtils.cloneLastChilds(cloneNum, row);
      row.append(...firsts);
      row.prepend(...lasts);
      [...row.children].forEach((slot) => slot.addEventListener('click', () => this.pauseAutoMove()));
    });
    this.disableAnimation();
    this.move(-cloneNum);
  }

  moveLeft(enableAnimation = true) {
    this.moveTimeout && this.moveLeftCorrection();
    enableAnimation && this.enableAnimation();
    if (this.step === -this.slotsNum - this.slotsCloneNum + 1) {
      this.disableAnimation();
      this.move(this.slotsNum);
      this.moveTimeout = setTimeout(() => this.moveLeftCorrection());
    }
    super.moveLeft();
  }

  moveRight(enableAnimation = true) {
    this.moveTimeout && this.moveRightCorrection();
    enableAnimation && this.enableAnimation();
    if (this.step === -this.slotsCloneNum) {
      this.disableAnimation();
      this.move(-this.slotsNum);
      this.moveTimeout = setTimeout(() => this.moveRightCorrection());
    }
    super.moveRight();
  }

  resetMoveTimeout() {
    clearTimeout(this.moveTimeout);
    this.moveTimeout = null;
  }

  moveLeftCorrection() {
    this.resetMoveTimeout();
    this.moveLeft();
  }

  moveRightCorrection() {
    this.resetMoveTimeout();
    this.moveRight();
  }

  enableAnimation() { this.view.classList.add(this.cssClassTransition); }
  disableAnimation() { this.view.classList.remove(this.cssClassTransition); }

  initProgress() {
    /** @type {HTMLElement} */
    this.progress = this.view.querySelector('.slider__progress');
  }

  updateProgressTime() { DomUtils.setCssVar(this.progress, '--progress-time', String(this.timeCounter)); }
  updateProgressMaxTime() { DomUtils.setCssVar(this.progress, '--max-time', String(this.maxTime)); }

  initSwitch() {
    /** @type {HTMLInputElement} */
    this.timeSwitch = this.view.querySelector('.slider__time-switch-check');
    this.timeSwitch.addEventListener('input', (e) => {
      if (this.timeSwitch.checked) {
        this.autoTime = this.autoTimeTest;
        this.pauseTime = this.pauseTimeTest;
      } else {
        this.autoTime = this.autoTimeDefault;
        this.pauseTime = this.pauseTimeDefault;
      }
      this.maxTime = this.autoTime;
      this.resetTimer();
    });
  }
}

class SideBar extends Observer {
  constructor(view, moveNum = 1) {
    super();
    this.view = view;
    this.isExpanded = false;
    this.step = 0;
    this.moveNum = moveNum;

    this.btnExpand = view.querySelector('.btn-icon--icon-expand');
    this.btnScroll = view.querySelector('.btn-icon--icon-scroll-down');

    const slots = view.querySelector('.side-bar__selector').childElementCount;
    const visibleSlots = +DomUtils.getCssVar(this.view, '--⚙️--side-bar-visible-slots');
    this.limit = slots - visibleSlots;

    this.btnExpand.addEventListener('click', () => this.isExpanded ? this.shrink() : this.expand());
    this.btnScroll.addEventListener('click', () => this.move());
  }

  expand() {
    this.view.classList.add('side-bar--expand');
    this.isExpanded = true;
  }
  shrink() {
    this.view.classList.remove('side-bar--expand');
    this.isExpanded = false;
  }

  move() {
    this.step += this.moveNum;
    this.correction();
    DomUtils.setCssVar(this.view, '--side-bar-move-slots', String(this.step));
  }

  correction() {
    if (this.step > this.limit) {
      this.step = 0;
    }
  }
}

class LiveCams extends LimitedSlider {
  /**
   * @param {HTMLElement} view
   * @param {import("./base-slider.js").SliderConfig} config
   */
  constructor(view, config) {
    super(view, config, 1);
    this.view = view;

    /** @type HTMLIFrameElement */
    this.mainVideo = view.querySelector('.youtube-player--main-cam .youtube-player__iframe');
    this.setYoutubeLink(this.mainVideo);
    this.initSlots();
  }

  /**
   * @param {HTMLIFrameElement} iframe
   */
  setYoutubeLink(iframe) { iframe.src = `https://www.youtube.com/embed/${iframe.dataset.youtubeId}`; }

  initSlots() {
    [...this.slots.children].forEach(slot => {
      /** @type HTMLIFrameElement */
      const selectedVideo = slot.querySelector('.youtube-player__iframe');
      this.setYoutubeLink(selectedVideo);

      slot.addEventListener('click', (e) => {
        [this.mainVideo.src, selectedVideo.src] = [selectedVideo.src, this.mainVideo.src];
      });
    });
  }
}

window.addEventListener('load', () => {
  initHambButton();
  initDonateApp();
  initPetsSlider(document.querySelector('.pets-in-zoo__slider'));
  initTimonialsSlider(document.querySelector('.testimonials__slider'));
  initSideBar(document.querySelector('.side-bar'));
  initLiveCams(document.querySelector('.live-cams'));
});

function initHambButton() {
  const btn = document.querySelector('.header__btn--hamburger');
  const menu = document.querySelector('.header__container--menu');
  btn.addEventListener('click', () => {
    btn.classList.toggle('header__btn--hamburger-close');
    menu.classList.toggle('header__container--menu-open');
  });
}

function initDonateApp() {
  new DonateApp(
    new Modal(document.querySelector('.modal-cover')),
    new Popup1(document.querySelector('.pop-up-first')),
    new Popup2(document.querySelector('.pop-up-second')),
    [...document.querySelectorAll('.btn--js-donate-step-0')],
    document.querySelector('.control-donation')
  );
}

function initPetsSlider(petsSliderView) {
  if (petsSliderView) {
    new PetsSlider(petsSliderView, {
      btnPrev: petsSliderView.querySelector('.btn-icon--prev'),
      btnNext: petsSliderView.querySelector('.btn-icon--next'),
      slots: petsSliderView.querySelector('.slider__slots'),
      cssVarMoveSlots: '--slider-move-slots',
      cssVarPageCols: '--page-cols',
      cssVarSlotCols: '--slider-slot-cols',
    }, 2);
  }
}

function initTimonialsSlider(testimonialsSliderView) {
  if (testimonialsSliderView) {
    new TestimonialsSlider2(testimonialsSliderView, {
      btnPrev: testimonialsSliderView.querySelector('.btn-icon--prev'),
      btnNext: testimonialsSliderView.querySelector('.btn-icon--next'),
      slots: testimonialsSliderView.querySelector('.slider__slots'),
      rows: testimonialsSliderView.querySelectorAll('.slider__slots'),
      cssVarMoveSlots: '--slider-move-slots',
      cssClassTransition: 'slider--transition',
      autoMoveTime: 15,
      pauseAutoMoveTime: 60,
    });
  }
}

function initSideBar(sideBarView) {
  sideBarView && new SideBar(sideBarView);
}

function initLiveCams(liveCamsView) {
  if (liveCamsView) {
    new LiveCams(liveCamsView, {
      btnPrev: liveCamsView.querySelector('.btn-icon--prev'),
      btnNext: liveCamsView.querySelector('.btn-icon--next'),
      slots: liveCamsView.querySelector('.live-cams__slots'),
      cssVarMoveSlots: '--🎦--slider-move-slots',
    });
  }
}
