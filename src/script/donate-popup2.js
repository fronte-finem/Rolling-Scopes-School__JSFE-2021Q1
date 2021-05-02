import { CreditCard } from './credit-card.js'
import { htmlToElem } from './dom-lib.js'
import { Popup } from './base-popup.js'
import { Input } from './input.js'

export { Popup2 };


class Popup2 extends Popup {
  DEFAULT_AMOUNTS = [10, 20, 30, 50, 80, 100];

  constructor(view, petsData) {
    super(view);

    this.doneTimerId = null;
    this.step = 1;
    this.amount = 0;
    this.choosedPet = 0;
    this.card = new CreditCard();

    this.form = this.view.querySelector('.pop-up-second__form');

    this.btnNext = this.initBtnNext();
    this.btnBack = this.initBtnBack();
    this.btnDone = this.initBtnDone();

    this.amountSelector = this.initAmountSelector();
    this.amountInput = this.initAmountInput();
    this.petsSelect = this.initPetsSelect(petsData);

    this.amountResetBtn = this.initAmountResetBtn();
    this.petsResetBtn = this.initPetsResetBtn();

    this.btns = [this.btnNext, this.btnBack, this.amountResetBtn, this.petsResetBtn];

    this.nameInput = new Input(this.view.querySelector('.pop-up-second__input-name'));
    this.emailInput = new Input(this.view.querySelector('.pop-up-second__input-email'));

    this.cardNumberInput = this.initCardNumberInput();
    this.cardCvvInput = this.initCardCvvInput();

    this.monthSelect = this.initMonthSelect();
    this.yearSelect = this.initYearSelect();
  }

  close() {
    if (this.step === 4 || this.doneTimerId) {
      clearTimeout(this.doneTimerId);
      this.doneTimerId = null;
      this.form.submit();
    }
    this.btnBack.click();
    this.btnBack.click();
    this.btnBack.click();
    this.nameInput.setValid();
    this.emailInput.setValid();
    this.cardNumberInput.setValid();
    this.cardCvvInput.setValid();
    this.form.reset();
    super.close();
  }

  submit() {
    this.doneTimerId = setTimeout(() => this.close(), 3000);
  }

  activateBtn(btn) { btn.classList.add('pop-up-second__btn--active') }
  deactivateBtn(btn) { btn.classList.remove('pop-up-second__btn--active') }

  deactivateAllBtn() {
    this.btns.forEach(btn => this.deactivateBtn(btn));
    this.amountSelector.forEach(btn => this.deactivateBtn(btn));
  }

  genClsSteps([oldStep, newStep]) { return [this.genClsStep(oldStep), this.genClsStep(newStep)]; }
  genClsStep(num) { return `pop-up-second--step-${num}`; }

  inc() { return this.step == 4 ? [this.step, this.step] : [this.step++, this.step]; }
  dec() { return this.step == 1 ? [this.step, this.step] : [this.step--, this.step]; }

  initBtnNext() {
    const btn = this.view.querySelector('.btn--next');
    btn.addEventListener('click', () => this.stepNext());
    return btn;
  }

  initBtnBack() {
    const btn = this.view.querySelector('.pop-up-second__btn-back');
    btn.addEventListener('click', () => this.stepBack());
    return btn;
  }

  stepNext() {
    if (!this.validateStep()) return;
    this.view.classList.replace(...this.genClsSteps(this.inc()));
    if (this.step === 3) {
      this.btnNext.classList.add('btn--hidden');
      this.btnDone.classList.remove('btn--hidden');
    }
  }

  stepBack() {
    this.view.classList.replace(...this.genClsSteps(this.dec()));
    if (this.step === 2) {
      this.btnNext.classList.remove('btn--hidden');
      this.btnDone.classList.add('btn--hidden');
    }
  };

  validateStep() {
    switch (this.step) {
      case 1:
          return this.amountInput.reportValidity()
              && this.petsSelect.reportValidity();
      case 2:
          return this.nameInput.validate()
              && this.emailInput.validate();
      case 3:
          const valid = this.card.validate();
          valid ? this.activateBtnDone() : this.deactivateBtnDone();
          return valid;
    }
  }

  initBtnDone() {
    const btn = this.view.querySelector('.btn--complete');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      this.stepNext();
      this.submit();
    });
    return btn;
  }
  activateBtnDone() { this.btnDone.disabled = false }
  deactivateBtnDone() { this.btnDone.disabled = true }

  initAmountSelector() {
    const btns = this.view.querySelectorAll('.pop-up-second__amount-selector .pop-up-second__btn');

    const amountSelector = [...btns].reduce((acc, btn) => {
      acc.set(btn.dataset.amount, btn);
      return acc;
    }, new Map());

    amountSelector.forEach(btn => btn.addEventListener('click', () => this.setAmount(btn.dataset.amount)));
    return amountSelector;
  }

  activateAmountSelector(amount) {
    if (!this.amountSelector.has(amount)) return false;
    this.deactivateAllBtn();
    this.activateBtn(this.amountSelector.get(amount));
    return true;
  }

  setAmount(value) {
    if (!value) {
      this.resetAmount();
      return;
    }
    this.amount = Number(value);
    this.amountInput.value = value;
    this.activateAmountSelector(value) || this.activateBtn(this.amountResetBtn);
  }

  resetAmount() {
    this.deactivateAllBtn();
    this.activateBtn(this.amountResetBtn);
    this.amount = 0;
    this.amountInput.value = '';
    this.amountInput.focus();
  }

  initAmountResetBtn() {
    const btn = this.view.querySelector('.pop-up-second__btn--reset-amount');
    btn.addEventListener('click', () => {
      this.resetAmount();
      this.activateBtn(btn);
    });
    return btn;
  }

  setInputLimit(input, limit) {
    input.addEventListener('input', () => {
      if (input.value.length < limit) return;
      input.value = input.value.substring(0, limit);
    });
  }

  initAmountInput() {
    const input = this.view.querySelector('.pop-up-second__amount-input');
    this.setInputLimit(input, 4);
    input.addEventListener('input', () => this.setAmount(input.value));
    return input;
  }

  initCardNumberInput(limit = 16) {
    const input = new Input(this.view.querySelector('.pop-up-second__input-card'),
      { limit: limit,
        pattern: `\\d{${limit}}`,
        errorMsg: `must contain ${limit} digits`,
      });
    input.onInput((value) => {
      this.card.setNumber(value);
      this.validateStep();
    })
    return input;
  }

  initCardCvvInput(limit = 3) {
    const input = new Input(this.view.querySelector('.pop-up-second__input-cvv'),
      { limit: limit,
        pattern: `\\d{${limit}}`,
        errorMsg: `must contain ${limit} digits`,
      });
    input.onInput((value) => {
      this.card.setCvv(value);
      this.validateStep();
    })
    return input;
  }

  initPetsResetBtn() {
    const btn = this.view.querySelector('.pop-up-second__btn--reset-pets');
    btn.addEventListener('click', () => {
      this.petsSelect.selectedIndex = this.choosedPet;
      this.activateBtn(btn);
    });
    return btn;
  }

  initPetsSelect(petsData) {
    const select = this.view.querySelector('.pop-up-second__select-pet');

    petsData.forEach(pet => {
      const opt = htmlToElem(`<option class="pop-up-second__option" value="${pet.value}">${pet.text}</option>`);
      select.add(opt);
    });
    select.addEventListener('input', () => {
      this.choosedPet = this.petsSelect.selectedIndex;
      console.log(select.value);
    });
    return select;
  }

  initMonthSelect() {
    const select = this.view.querySelector('.pop-up-second__select-month');
    this.card.months.forEach((num) => {
      const opt = htmlToElem(
        `<option class="pop-up-second__option" value="${this.card.formatMonth(num)}">${this.card.prettyMonth(num)}</option>`);
      select.add(opt);
    });
    select.addEventListener('input', () => {
      this.card.setMonth(select.value);
      this.validateStep();
    });
    return select;
  }

  initYearSelect() {
    const select = this.view.querySelector('.pop-up-second__select-year');
    this.card.validYears.forEach((year) => {
      const opt = htmlToElem(`<option class="pop-up-second__option" value="${year}">${year}</option>`);
      select.add(opt);
    });
    select.addEventListener('input', () => {
      this.card.setYear(select.value);
      this.validateStep();
    });
    return select;
  }
}
