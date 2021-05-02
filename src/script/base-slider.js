import { Observer } from './obsesrver.js'
import { getCssVar, setCssVar } from './dom-lib.js'

export { Slider }

class Slider extends Observer {
  constructor(view, moveNum = 3) {
    super();
    this.view = view;
    this._moveNum = moveNum;
    this.step = 0;

    this.btnPrev = view.querySelector('.btn-icon--prev');
    this.btnNext = view.querySelector('.btn-icon--next');
    this.row1 = view.querySelector('.slider__slots--row-1');
    this.row2 = view.querySelector('.slider__slots--row-2');

    this.validate();

    this.btnPrev.addEventListener('click', () => this.moveLeft());
    this.btnNext.addEventListener('click', () => this.moveRight());
  }

  moveLeft() { this.move(-this.moveNum); }
  moveRight() { this.move(this.moveNum); }

  move(num) {
    this.step += num;
    this.validate();
    setCssVar(this.view, '--slider-move-slots', this.step);
  }

  get slotsOnPage() {
    const pageCols = +getCssVar(this.view, '--page-cols');
    const slotCols = +getCssVar(this.view, '--slider-slot-cols');
    return pageCols / slotCols;
  }

  get moveNum() { return Math.min(this._moveNum, this.slotsOnPage) }

  get slotsNum() { return this.row1.querySelectorAll('.slider__slot').length; }

  get limit() { return -1 * (this.slotsNum - this.slotsOnPage); }

  validate() {
    const limit = this.limit;

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
}
