import { Piano } from './piano.js'
import { PIANO_CFG } from './piano-cfg.js'
import { toggleClass } from './util.js'

window.addEventListener('load', _ => {
  const piano = new Piano(document.querySelector('.piano'));
  PIANO_CFG.map(piano.addKey.bind(piano));

  const toggleBtn = toggleClass.bind(null, 'btn-active');

  const btnNotes = document.querySelector('.btn-notes');
  const btnLetters = document.querySelector('.btn-letters');

  btnNotes.addEventListener('click', (_) => {
    toggleBtn({add:btnNotes, del:btnLetters});
    piano.toggleLetters(false);
  });
  btnLetters.addEventListener('click', (_) => {
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

  document.querySelector('.btn-fullscreen').addEventListener('click', (_) => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      document.documentElement.requestFullscreen();
    }
  });

  const theme = document.querySelector("#theme-link");

  document.querySelector('.btn-theme').addEventListener('click', (e) => {
    e.target.classList.toggle('btn-theme--dark');
    const isDark = theme.getAttribute("href") == './assets/css/color-theme-dark.css';
    theme.href = `./assets/css/color-theme-${isDark ? 'light' : 'dark'}.css`;
  });
});
