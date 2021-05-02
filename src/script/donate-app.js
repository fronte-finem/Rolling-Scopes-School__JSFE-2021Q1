import { Observer } from './obsesrver.js'
import { QuickDonateControl } from './quick-donate-control.js'

export { DonateApp }

class DonateApp extends Observer {
  constructor(modal, popup1, popup2, step0Btns, quickDonateControlView) {
    super();
    this.modal = modal;
    this.popup1 = popup1;
    this.popup2 = popup2;
    this.quickDonateControl = quickDonateControlView && new QuickDonateControl(quickDonateControlView);

    modal.onClose(() => [popup1, popup2].forEach(p => p.close()));

    [popup1, popup2].forEach(popup => popup.onClose(() => this.modal.hide()));

    step0Btns.forEach(btn => btn.addEventListener('click', () => this.step0()));

    popup1.onSubmit((value) => this.step1(value));

    this.quickDonateControl?.onSubmit((value) => this.step1(value));
  }

  step0() {
    console.log(this);
    this.modal.show();
    this.popup1.show();
  }

  step1(value) {
    this.modal.show();
    this.popup1.hide();
    this.popup2.show();
    this.popup2.setAmount(value);
  }
}
