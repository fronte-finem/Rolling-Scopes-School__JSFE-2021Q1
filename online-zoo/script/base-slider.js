import { Observer } from './obsesrver.js'
import { setCssVar } from './dom-lib.js'

export { Slider, LimitedSlider, SyncSlider }

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
    setCssVar(this.view, this.cssVarMoveSlots, this.step);
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
    const sliderWidth = this.slots.getClientRects()[0].width
    const slotWidth = this.slots.firstElementChild.getClientRects()[0].width
    return Math.floor(sliderWidth / slotWidth);
  }

  calcMoveNum() { return Math.min(this._moveNum, this.calcSlotsOnPage()) }
}

class SyncSlider extends Slider {
  /**
   * @param {HTMLElement} view
   * @param {SliderConfig} config
   * @param {number} moveNum
   */
  constructor(view, config, moveNum = 3) {
    super(view, config, moveNum);
    this.isMoving = false;

    this.onMoveEnd(() => this.isMoving = false);
  }

  /**
   * @callback handler
   * @param {HTMLElement} this
   * @param {TransitionEvent} ev
   */

  /**
   * @param {handler} handler
   */
  onMoveEnd(handler) { this.slots.addEventListener('transitionend', handler) }
  /**
   * @param {handler} handler
   */
  onMoveEndRemove(handler) { this.slots.removeEventListener('transitionend', handler) }

  moveLeft() {
    if (this.isMoving) return;
    this.isMoving = true;
    super.moveLeft()
  }

  moveRight() {
    if (this.isMoving) return;
    this.isMoving = true;
    super.moveRight()
  }
}
