import { Piano } from './piano.js'
import { PIANO_CFG } from './piano-cfg.js'
import { toggleClass } from './util.js'

window.addEventListener('load', _ => {
  const piano = new Piano(document.querySelector('.piano'));
  PIANO_CFG.map(piano.addKey.bind(piano));

  const toggleBtn = toggleClass.bind(null, 'btn-active');

  const btnNotes = document.querySelector('.btn-notes');
  const btnLetters = document.querySelector('.btn-letters');

  btnNotes.addEventListener('click', () => {
    toggleBtn({add:btnNotes, del:btnLetters});
    piano.toggleLetters(false);
  });
  btnLetters.addEventListener('click', () => {
    toggleBtn({del:btnNotes, add:btnLetters});
    piano.toggleLetters(true);
  });

  document.addEventListener('keydown', (e) => {
    if (e.repeat) return false;
    piano.playKey(e.code);
  });
  document.addEventListener('keyup', (e) => {
    piano.stopKey(e.code);
  });

  const btnFullScreen = document.querySelector('.fullscreen');
  const toggleBtnFS = toggleClass.bind(null, 'openfullscreen');

  btnFullScreen.addEventListener('click', toggleFullScreen)

  function toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
      toggleBtnFS({add:btnFullScreen});
    } else {
      document.documentElement.requestFullscreen();
      toggleBtnFS({del:btnFullScreen});
    }
  }
});
