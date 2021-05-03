import { Observer } from './obsesrver.js'
import { getCssVar, setCssVar } from './dom-lib.js'

export { Slider }

class Slider extends Observer {
  constructor(view, moveNum = 3) {
    super();
    this.view = view;
    this._moveNum = moveNum;
    this.step = 0;
    this.isMoving = false;

    this.btnPrev = view.querySelector('.btn-icon--prev');
    this.btnNext = view.querySelector('.btn-icon--next');
    this.row = view.querySelector('.slider__slots');

    this.btnPrev.addEventListener('click', () => this.isMoving || this.moveLeft());
    this.btnNext.addEventListener('click', () => this.isMoving || this.moveRight());

    this.onMoveEnd(() => this.isMoving = false);
  }

  onMoveEnd(handler) { this.row.addEventListener('transitionend', handler) }
  onMoveEndRemove(handler) { this.row.removeEventListener('transitionend', handler) }

  moveLeft() {
    this.isMoving = true;
    this.move(-this.calcMoveNum());
  }

  moveRight() {
    this.isMoving = true;
    this.move(this.calcMoveNum());
  }

  move(num) {
    this.step += num;
    this.correction();
    setCssVar(this.view, '--slider-move-slots', this.step);
  }

  correction() {}

  calcMoveNum() { return this._moveNum }
}
