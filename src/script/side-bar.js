import { Observer } from './obsesrver.js'

export { SideBar }

class SideBar extends Observer {
  constructor(view) {
    super();
    this.view = view;
    this.isExpanded = false;

    this.btnExpand = view.querySelector('.btn-icon--icon-expand');

    this.btnExpand.addEventListener('click', () => this.isExpanded ? this.shrink() : this.expand())
  }

  expand() {
    this.view.classList.add('side-bar--expand');
    this.isExpanded = true;
  }
  shrink() {
    this.view.classList.remove('side-bar--expand');
    this.isExpanded = false;
  }
}
