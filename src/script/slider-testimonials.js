import { Slider } from './base-slider.js'
import { getCssVar, setCssVar } from './dom-lib.js'

export { TestimonialsSlider }

class TestimonialsSlider extends Slider {
  constructor(view) {
    super(view, 1);

    this.rows = view.querySelectorAll('.slider__slots');
    this.initSlots();

    this.onMoveEnd(() => this.disableAnimation());
  }

  enableAnimation() { this.view.classList.add('slider--transition') }
  disableAnimation() { this.view.classList.remove('slider--transition') }

  initSlots() {
    const slotsNum = this.row.childElementCount;
    this.slotsOrders = Array(slotsNum).fill(0);
    this.firstSlot = 0;
    this.lastSlot = slotsNum - 1;

    this.rows.forEach(row => [...row.children].forEach(slot => slot.style.order = 0));
  }

  setSlotOrder(slot, order) {
    this.rows.forEach(row => row.children[slot].style.order = order);
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

  moveLeft() {
    this.isMoving = true;

    const handler = () => {
      this.onMoveEndRemove(handler);
      this.move(1);
      this.changeOrderToLeft();
    }

    this.onMoveEnd(handler);
    this.enableAnimation()
    this.move(-1);
  }

  moveRight() {
    this.isMoving = true;

    this.move(-1);
    this.changeOrderToRight();

    setTimeout(() => {
      this.enableAnimation()
      this.move(1);
    });
  }
}
