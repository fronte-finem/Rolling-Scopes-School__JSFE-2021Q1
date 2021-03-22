
import { newBtn, newDiv } from './util.js';

export { preset }

const preset = {
  btnNotes: newBtn('btn btn-🎶 btn-active'),
  btnLetters: newBtn('btn btn-🔠'),
  btnCfg1: newBtn('btn btn-🎹 btn-active'),
  btnCfg2: newBtn('btn btn-🎸'),
  piano: newDiv('piano'),
}

preset.btnNotes.textContent = 'Notes';
preset.btnLetters.textContent = 'Letters';

preset.btnCfg1.textContent = '🎹';
preset.btnCfg2.textContent = '🎸';

const btnCont = newDiv('btn-container');
btnCont.append(preset.btnCfg1);
btnCont.append(preset.btnCfg2);
btnCont.append(preset.btnNotes);
btnCont.append(preset.btnLetters);

const main = document.querySelector('.main');
main.append(btnCont);
main.append(preset.piano);
