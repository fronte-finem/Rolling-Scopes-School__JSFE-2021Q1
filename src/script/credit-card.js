export { CreditCard }

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
  validateYear() { return this.validYears.includes(this._year) }

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
    return new Map(this.initMonths.map((_, i) => [i, this.formatMonth(i)]));
  }

  get prettyMonths() {
    return new Map(this.initMonths.map((_, i) => [this.formatMonth(i), `${this.formatMonth(i)} ▪️ ${this.prettyMonth(i)}`]));
  }
}
