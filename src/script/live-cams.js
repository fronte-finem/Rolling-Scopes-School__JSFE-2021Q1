import { Observer } from './obsesrver.js'

export { LiveCams }

class LiveCams extends Observer {
  constructor(view, moveNum = 1) {
    super();
    this.view = view;

    this.mainVideo = view.querySelector('.youtube-player--main-cam .youtube-player__iframe');
    this.videoSlots = view.querySelectorAll('.live-cams__slot');

    this.videoSlots.forEach(slot => {
      const selectedVideo = this.getVideoFrame(slot);

      slot.addEventListener('click', (e) => {
        [this.mainVideo.src, selectedVideo.src] = [selectedVideo.src, this.mainVideo.src];
      })
    });
  }

  getVideoFrame(view) { return view.querySelector('.youtube-player__iframe') }
}
