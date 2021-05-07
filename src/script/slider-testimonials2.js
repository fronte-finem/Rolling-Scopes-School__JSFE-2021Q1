import { Slider } from './base-slider.js'
import { DomUtils } from './dom-lib.js'

export { TestimonialsSlider2 }

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

    this.mainTimer = setInterval(() => this.updateCounter(), 1000);
    this.resetTimer();

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
    enableAnimation && this.enableAnimation();
    super.moveLeft();
    if (this.step === -this.slotsNum) {
      this.disableAnimation();
      this.move(this.slotsNum);
      setTimeout(() => this.moveLeft());
    }
  }

  moveRight(enableAnimation = true) {
    enableAnimation && this.enableAnimation();
    super.moveRight();
    if (this.step === 0) {
      this.disableAnimation();
      this.move(-this.slotsNum);
      setTimeout(() => this.moveRight());
    }
  }

  enableAnimation() { this.view.classList.add(this.cssClassTransition) }
  disableAnimation() { this.view.classList.remove(this.cssClassTransition) }

  initProgress() {
    /** @type {HTMLElement} */
    this.progress = this.view.querySelector('.slider__progress');
  }

  updateProgressTime() { DomUtils.setCssVar(this.progress, '--progress-time', String(this.timeCounter)); }
  updateProgressMaxTime() { DomUtils.setCssVar(this.progress, '--max-time', String(this.maxTime)); }
}
