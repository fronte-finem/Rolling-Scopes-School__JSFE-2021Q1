import { Observer } from './obsesrver.js'
import { getCssVar, setCssVar } from './dom-lib.js'

export { SideBar }

class SideBar extends Observer {
  constructor(view, moveNum = 1) {
    super();
    this.view = view;
    this.isExpanded = false;
    this.step = 0;
    this.moveNum = moveNum;

    this.btnExpand = view.querySelector('.btn-icon--icon-expand');
    this.btnScroll = view.querySelector('.btn-icon--icon-scroll-down');

    const slots = view.querySelector('.side-bar__selector').childElementCount;
    const visibleSlots = +getCssVar(this.view, '--⚙️--side-bar-visible-slots');
    this.limit = slots - visibleSlots;

    this.btnExpand.addEventListener('click', () => this.isExpanded ? this.shrink() : this.expand());
    this.btnScroll.addEventListener('click', () => this.move());
  }

  expand() {
    this.view.classList.add('side-bar--expand');
    this.isExpanded = true;
  }
  shrink() {
    this.view.classList.remove('side-bar--expand');
    this.isExpanded = false;
  }

  move() {
    this.step += this.moveNum;
    this.correction();
    setCssVar(this.view, '--side-bar-move-slots', this.step);
  }

  correction() {
    if (this.step > this.limit) {
      this.step = 0;
    }
  }
}
