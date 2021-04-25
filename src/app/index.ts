import { newElem } from '../lib/dom-helpers.js';
import { observer } from '../lib/observer.js';
import { ViewBEM, ImageLinksRoll } from '../lib/types.js';
import { FilterIOSettings } from '../components/_filter-io.js';
import { App } from '../components/_app.js';

window.addEventListener('load', (e) => {
  initFullscreanBtn();

  const appCont = document.querySelector('.page__container--app');

  const filterIOViewSettings = [
    new FilterIOSettings('blur', 0, 0, 10, 'px'),
    new FilterIOSettings('invert', 0, 0, 100, '%'),
    new FilterIOSettings('sepia', 0, 0, 100, '%'),
    new FilterIOSettings('saturate', 100, 0, 200, '%'),
    new FilterIOSettings('hue-rotate', 0, 0, 360, 'deg'),
  ];

  const app = new App(filterIOViewSettings);

  appCont.append(app.view);

  // testImageLinksRoll();

  function testImageLinksRoll() {
    const imageLinksRoll = new ImageLinksRoll();
    for (let h=0; h<24; h++) {
      for (let m=0; m<60; m++) {
        const date = new Date(2021, 0, 0, h, m);
        console.log(imageLinksRoll.next(date).replace(/.*images./, ''), date.toTimeString());
      }
    }
  }
});

function initFullscreanBtn() {
  const btn = document.querySelector('.btn-icon--fullscreen') as HTMLButtonElement;
  btn.addEventListener('click', toggleFullScreen);
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen && document.exitFullscreen();
  }
}
