import { preset } from './init.js'
import { Piano } from './piano.js'
import { NOTES_DEFAULT, NOTES_FUNNY } from './piano-cfg.js'


window.addEventListener('load', () => {
  const piano = new Piano(preset.piano);

  piano.addCfg('🎹', './assets/audio/piano', NOTES_DEFAULT);
  piano.addCfg('🎸', './assets/audio/guitar', NOTES_FUNNY);

  piano.setCfg('🎹');

  preset.btnNotes.addEventListener('click', () => {
    if (!piano.showNotes()) return false;
    preset.btnNotes.classList.add('btn-active');
    preset.btnLetters.classList.remove('btn-active');
  });
  preset.btnLetters.addEventListener('click', () => {
    if (!piano.showLetters()) return false;
    preset.btnNotes.classList.remove('btn-active');
    preset.btnLetters.classList.add('btn-active');
  });

  preset.btnCfg1.addEventListener('click', () => {
    if (!piano.setCfg('🎹')) return false;
    preset.btnCfg1.classList.add('btn-active');
    preset.btnCfg2.classList.remove('btn-active');
  });
  preset.btnCfg2.addEventListener('click', () => {
    if (!piano.setCfg('🎸')) return false;
    preset.btnCfg1.classList.remove('btn-active');
    preset.btnCfg2.classList.add('btn-active');
  });

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
