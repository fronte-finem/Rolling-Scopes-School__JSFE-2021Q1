import { Observer } from './obsesrver.js'
import { getCssVar, setCssVar } from './dom-lib.js'

export { LiveCams }

class LiveCams extends Observer {
  constructor(view) {
    super();
    this.view = view;
    this.step = 0;

    this.mainVideo = view.querySelector('.youtube-player--main-cam .youtube-player__iframe');
    this.setYoutubeLink(this.mainVideo);
    this.slider = view.querySelector('.live-cams__slots');
    this.initSlots();

    this.btnPrev = view.querySelector('.btn-icon--prev');
    this.btnNext = view.querySelector('.btn-icon--next');
    this.btnPrev.addEventListener('click', () => this.moveLeft());
    this.btnNext.addEventListener('click', () => this.moveRight());

    this.correction();
  }

  setYoutubeLink(iframe) { iframe.src = `https://www.youtube.com/embed/${iframe.dataset.youtubeId}` }

  initSlots() {
    [...this.slider.children].forEach(slot => {
      const selectedVideo = slot.querySelector('.youtube-player__iframe');
      this.setYoutubeLink(selectedVideo);

      slot.addEventListener('click', (e) => {
        [this.mainVideo.src, selectedVideo.src] = [selectedVideo.src, this.mainVideo.src];
      })
    });
  }

  moveLeft() { this.move(-1); }

  moveRight() { this.move(1); }

  move(num) {
    this.step += num;
    this.correction();
    setCssVar(this.view, '--🎦--slider-move-slots', this.step);
  }

  calcLimit() { return -1 * (this.slider.childElementCount - this.calcSlotsOnPage()); }

  calcSlotsOnPage() {
    const sliderWidth = this.slider.getClientRects()[0].width
    const slotWidth = this.slider.firstElementChild.getClientRects()[0].width
    return Math.floor(sliderWidth / slotWidth);
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
}
