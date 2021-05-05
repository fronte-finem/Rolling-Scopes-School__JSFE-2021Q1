import { Observer } from './obsesrver.js'
import { CreditCard } from './credit-card.js'
import { petsData } from './pets-config.js'
import { Popup } from './base-popup.js'
import { Input } from './input.js'
import { Select } from './select.js'

export { Popup2 };

 /** @typedef {import('./pets-config.js').PetsData} PetsData */

class Popup2Utils {
  static activateBtn(btn) { btn.classList.add('pop-up-second__btn--active') }
  static deactivateBtn(btn) { btn.classList.remove('pop-up-second__btn--active') }
  static deactivateAllBtn(btns) { btns.forEach(btn => Popup2Utils.deactivateBtn(btn)) }

  static hideBtn(btn) { btn.classList.add('btn--hidden') }
  static showBtn(btn) { btn.classList.remove('btn--hidden') }

  static hideStep(step) { step.classList.add('pop-up-second__step--hidden') }
  static showStep(step) { step.classList.remove('pop-up-second__step--hidden') }
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
  }

  setAmount(value) { this.steps[0].setAmount(value) }

  activateStep() {
    this.step = this.steps[this.stepNum];
    this.step.startWatch();
    this.step.show();
  }
  deactivateStep() {
    this.step.stopWatch();
    this.step.hide();
  }

  activateNextStepBtn() {
    this.nextStepAllowed = true;
    if (this.stepNum < 2) {
      Popup2Utils.activateBtn(this.btnNext);
    } else {
      this.btnDone.disabled = true;
    }
  }
  deactivateNextStepBtn() {
    this.nextStepAllowed = false;
    if (this.stepNum < 2) {
      Popup2Utils.deactivateBtn(this.btnNext)
    } else {
      this.btnDone.disabled = false;
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

    if (this.stepNum === 2) {
      Popup2Utils.hideBtn(this.btnNext);
      Popup2Utils.showBtn(this.btnDone);
    }
  }

  stepBack() {
    this.deactivateStep();
    this.stepNum--;
    this.activateStep();

    if (this.stepNum === 1) {
      Popup2Utils.hideBtn(this.btnDone);
      Popup2Utils.showBtn(this.btnNext);
    }
  };

  initForm(form) {
    this.form = form;
    form.addEventListener('submit', (e) => e.preventDefault(), true);
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
    btn.addEventListener('click', () => {
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

  onSelected(listener) { this.addListener('Selected', listener) }
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

  hide() { Popup2Utils.hideStep(this.view) }
  show() { Popup2Utils.showStep(this.view) }

  validate() { throw new Error('Method not implemented.') }
  reset() { throw new Error('Method not implemented.') }

  startWatch() { this.addListener('Validate', this.listener) }
  stopWatch() { this.delListener('Validate', this.listener) }
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
    const valid = this.amountInput.checkValidity()
               && this.petsSelect.checkValidity();
    this.dispatch('Validate', valid);
    return valid;
  }

  reset() {
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
    const valid = this.creditCard.validate();
    this.dispatch('Validate', valid);
    return valid;
  }

  reset() {
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
    })
  }

  initCardCvvInput(view, limit = 3) {
    this.cardCvvInput = new Input(view, this.generateConfig(limit));
    this.cardCvvInput.onInput((value) => {
      this.creditCard.setCvv(value);
      this.validate();
    })
  }

  initMonthSelect(view) {
    new Select(view, this.creditCard.prettyMonths, 'pop-up-second__option')
      .onSelect((value) => {
        this.creditCard.setMonth(value);
        this.validate();
      });
  }

  initYearSelect(view) {
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

  validate() { return true; }

  reset() {}
}
