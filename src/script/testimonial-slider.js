import { Observer } from './obsesrver.js'
import { getCssVar, setCssVar } from './dom-lib.js'

export { TestimonialSlider }

class TestimonialSlider extends Observer {
  constructor(view) {
    super();
    this.view = view;
    this.step = 0;
    this.moveTime = getCssVar(this.view, '--slider-move-time');
    this.isMoving = false;

    this.btnPrev = view.querySelector('.btn-icon--prev');
    this.btnNext = view.querySelector('.btn-icon--next');
    this.row1 = view.querySelector('.slider__slots--row-1');
    this.row2 = view.querySelector('.slider__slots--row-2');
    this.initSlots();

    this.btnPrev.addEventListener('click', () => this.isMoving || this.moveLeft());
    this.btnNext.addEventListener('click', () => this.isMoving || this.moveRight());
  }

  initSlots() {
    const slots = this.row1.childElementCount;
    this.slotsOrders = Array(slots).fill(0);
    this.firstSlot = 0;
    this.lastSlot = slots - 1;

    [this.row1, this.row2].forEach(init);
    function init(row) { [...row.children].forEach(slot => slot.style.order = 0) }
  }

  setSlotOrder(slot, order) {
    [this.row1, this.row2].forEach(row => row.children[slot].style.order = order);
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
    const onTransitionEnd = handler.bind(this);
    this.row1.addEventListener('transitionend', onTransitionEnd);

    this.isMoving = true;

    this.view.classList.add('slider--transition');
    this.move(-1);

    function handler() {
      this.view.classList.remove('slider--transition');
      this.row1.removeEventListener('transitionend', onTransitionEnd);
      this.move(1);
      this.changeOrderToLeft();
      this.isMoving = false;
    }
  }

  moveRight() {
    const onTransitionEnd = handler.bind(this);
    this.row1.addEventListener('transitionend', onTransitionEnd);

    this.isMoving = true;
    this.move(-1);
    this.changeOrderToRight();

    setTimeout(() => {
      this.view.classList.add('slider--transition');
      this.move(1);
    });

    function handler() {
      this.view.classList.remove('slider--transition');
      this.row1.removeEventListener('transitionend', onTransitionEnd);
      this.isMoving = false;
    }
  }

  move(num) {
    this.step += num;
    setCssVar(this.view, '--slider-move-slots', this.step);
  }
}
