import { LimitedSlider } from './base-slider.js'

export { LiveCams }

class LiveCams extends LimitedSlider {
  /**
   * @param {HTMLElement} view
   * @param {import("./base-slider.js").SliderConfig} config
   */
  constructor(view, config) {
    super(view, config, 1);
    this.view = view;

    /** @type HTMLIFrameElement */
    this.mainVideo = view.querySelector('.youtube-player--main-cam .youtube-player__iframe');
    this.setYoutubeLink(this.mainVideo);
    this.initSlots();
  }

  /**
   * @param {HTMLIFrameElement} iframe
   */
  setYoutubeLink(iframe) { iframe.src = `https://www.youtube.com/embed/${iframe.dataset.youtubeId}` }

  initSlots() {
    [...this.slots.children].forEach(slot => {
      /** @type HTMLIFrameElement */
      const selectedVideo = slot.querySelector('.youtube-player__iframe');
      this.setYoutubeLink(selectedVideo);

      slot.addEventListener('click', (e) => {
        [this.mainVideo.src, selectedVideo.src] = [selectedVideo.src, this.mainVideo.src];
      })
    });
  }
}
