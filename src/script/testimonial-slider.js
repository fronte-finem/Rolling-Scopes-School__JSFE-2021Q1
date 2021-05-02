import { Observer } from './obsesrver.js'
import { getCssVar, setCssVar } from './dom-lib.js'

export { TestimonialSlider }

class TestimonialSlider extends Observer {
  constructor(view) {
    super();
    this.view = view;
    this.step = 0;
    this.moveTime = getCssVar(this.view, '--slider-move-time');

    this.btnPrev = view.querySelector('.btn-icon--prev');
    this.btnNext = view.querySelector('.btn-icon--next');
    this.row1 = view.querySelector('.slider__slots--row-1');
    this.row2 = view.querySelector('.slider__slots--row-2');

    this.btnPrev.addEventListener('click', () => this.moveLeft());
    this.btnNext.addEventListener('click', () => this.moveRight());
  }

  getFirst(row) { return row.querySelector('.slider__slot:first-child'); }
  getLast(row) { return row.querySelector('.slider__slot:last-child'); }

  move(num) {
    this.step += num;
    setCssVar(this.view, '--slider-move-slots', this.step);
  }

  moveLeft() {
    const handlerMoveLeft = moveLeftEnd.bind(this);

    this.move(-1);
    this.row1.addEventListener('transitionend', handlerMoveLeft);

    function moveLeftEnd() {
      this.row1.removeEventListener('transitionend', handlerMoveLeft);
      setCssVar(this.view, '--slider-move-time', '0');
      this.row1.append(this.getFirst(this.row1));
      this.row2.append(this.getFirst(this.row2));
      this.move(1);
      setTimeout(() => setCssVar(this.view, '--slider-move-time', this.moveTime));
    }
  }

  moveRight() {
    setCssVar(this.view, '--slider-move-time', '0');
    this.move(-1);
    this.row1.prepend(this.getLast(this.row1));
    this.row2.prepend(this.getLast(this.row2));
    setTimeout(() => {
      setCssVar(this.view, '--slider-move-time', this.moveTime);
      this.move(1);
    });
  }
}
