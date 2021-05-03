import { Slider } from './base-slider.js'
import { getCssVar, setCssVar } from './dom-lib.js'

export { PetsSlider }

class PetsSlider extends Slider {
  constructor(view, moveNum = 3) {
    super(view, moveNum);
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

  calcLimit() { return -1 * (this.row.childElementCount - this.calcSlotsOnPage()); }

  calcSlotsOnPage() {
    const pageCols = +getCssVar(this.view, '--page-cols');
    const slotCols = +getCssVar(this.view, '--slider-slot-cols');
    return pageCols / slotCols;
  }

  calcMoveNum() { return Math.min(this._moveNum, this.calcSlotsOnPage()) }
}
