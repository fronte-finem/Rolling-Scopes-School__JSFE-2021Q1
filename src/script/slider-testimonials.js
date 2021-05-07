import { SyncSlider } from './base-slider.js'

export { TestimonialsSlider }

/**
 * @typedef {import('./base-slider.js').SliderConfig} SliderConfig
 *
 * @typedef {SliderConfig & Addon} TestimonialsSliderConfig
 *
 * @typedef {object} Addon
 * @property {NodeList} rows              - all slots containers
 * @property {string} cssClassTransition  - css-variable for set slots index
 */

class TestimonialsSlider extends SyncSlider {
  /**
   * @param {HTMLElement} view
   * @param {TestimonialsSliderConfig} testimonialsSliderConfig
   */
  constructor(view, {rows, cssClassTransition, ...config}, autoTime = 1, pauseTime = 5) {
    super(view, config, 1);
    this.autoTime = autoTime;
    this.pauseTime = pauseTime;
    this.timer = null;
    this.pause = null;
    this.cssClassTransition = cssClassTransition;

    this.rows = rows;
    this.initSlots();

    this.onMoveEnd(() => this.disableAnimation());

    this.startAutoMove();

    this.btnPrev.addEventListener('click', () => this.pauseTimer());
    this.btnNext.addEventListener('click', () => this.pauseTimer());
  }

  moveLeft() {
    if (this.isMoving) return;
    this.isMoving = true;

    const handler = () => {
      this.onMoveEndRemove(handler);
      this.move(1);
      this.changeOrderToLeft();
    }

    this.onMoveEnd(handler);
    this.enableAnimation();
    this.move(-1);
  }

  moveRight() {
    if (this.isMoving) return;
    this.isMoving = true;

    this.move(-1);
    this.changeOrderToRight();

    setTimeout(() => {
      this.enableAnimation();
      this.move(1);
    });
  }

  startAutoMove() {
    this.moveLeft();
    this.timer = setInterval(() => this.moveLeft(), 1000 * this.autoTime);
  }

  pauseTimer() {
    clearInterval(this.timer);
    clearTimeout(this.pause);
    this.pause = setTimeout(() => this.startAutoMove(), 1000 * this.pauseTime);
  }

  enableAnimation() { this.view.classList.add(this.cssClassTransition) }
  disableAnimation() { this.view.classList.remove(this.cssClassTransition) }

  initSlots() {
    const slotsNum = this.slots.childElementCount;
    this.slotsOrders = Array(slotsNum).fill(0);
    this.firstSlot = 0;
    this.lastSlot = slotsNum - 1;

    this.rows.forEach((row) => [...row.children].forEach(slot => {
      slot.style.order = 0;
      slot.addEventListener('click', () => this.pauseTimer());
    }));
  }

  /**
   * @param {number} slot
   * @param {number} order
   */
  setSlotOrder(slot, order) {
    this.rows.forEach((row) => row.children[slot].style.order = order);
  }

  changeOrderToLeft() {
    this.slotsOrders[this.firstSlot] += 1;
    this.setSlotOrder(this.firstSlot, this.slotsOrders[this.firstSlot]);
    this.lastSlot = this.firstSlot;
    this.firstSlot = (this.firstSlot + 1) % this.slotsOrders.length;
  }
  changeOrderToRight() {
    this.slotsOrders[this.lastSlot] -= 1;
    this.setSlotOrder(this.lastSlot, this.slotsOrders[this.lastSlot]);
    this.firstSlot = this.lastSlot;
    this.lastSlot = (this.lastSlot - 1 < 0) ? (this.slotsOrders.length - 1) : (this.lastSlot - 1);
  }
}
