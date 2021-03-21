import { Piano } from './piano.js'
import { PIANO_CFG } from './piano-cfg.js'

window.addEventListener('load', () => {
  const piano = new Piano(document.querySelector('.piano'), {
    btnNotes: document.querySelector('.btn-notes'),
    btnLetters: document.querySelector('.btn-letters')
  });
  PIANO_CFG.map(piano.addKey.bind(piano));

  document.addEventListener('keydown', (e) => e.repeat || piano.keyDown(e.code));
  document.addEventListener('keyup', (e) => piano.keyUp(e.code));

  document.querySelector('.btn-fullscreen').addEventListener('click', () => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      document.documentElement.requestFullscreen();
    }
  });

  const theme = document.querySelector("#theme-link");

  document.querySelector('.btn-theme').addEventListener('click', (e) => {
    e.target.classList.toggle('btn-theme--dark');
    const isDark = './assets/css/color-theme-dark.css' == theme.getAttribute("href");
    theme.href = `./assets/css/color-theme-${isDark ? 'light' : 'dark'}.css`;
  });
});
