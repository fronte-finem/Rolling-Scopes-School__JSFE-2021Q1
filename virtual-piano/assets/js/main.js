import { toggleClass } from './util.js'

const toggleBtn = toggleClass.bind(null, 'btn-active');
const toggleLetters = toggleClass.bind(null, 'letters');
const toggleActive = toggleClass.bind(null, 'active');

const piano = document.querySelector('.piano');

const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');

btnNotes.addEventListener('click', () => {
  toggleBtn({add:btnNotes, del:btnLetters});
  toggleLetters({del:piano});
});
btnLetters.addEventListener('click', () => {
  toggleBtn({add:btnLetters, del:btnNotes});
  toggleLetters({add:piano});
});

let onPiano = false;

piano.addEventListener('mouseenter', e => onPiano = true);
piano.addEventListener('mouseleave', e => onPiano = false);

piano.querySelectorAll('.piano-key').forEach(pKey => {
  pKey.addEventListener('mousedown', handleKeyStart);
  pKey.addEventListener('mouseover', handleKeyStart);
  pKey.myAudio = new Audio(`./assets/audio/${pKey.parentElement.dataset.note}.mp3`);
});

function handleKeyStart(e) {
  if (e.buttons != 1) return false;
  toggleActive({add: [e.target, e.target.parentElement]});
  e.target.addEventListener('mouseup', handleKeyEnd);
  e.target.addEventListener('mouseout', handleKeyEnd);
  e.target.myAudio.pause();
  e.target.myAudio.currentTime = 0;
  e.target.myAudio.play();
}

function handleKeyEnd(e) {
  toggleActive({del: [e.target, e.target.parentElement]});
  e.target.removeEventListener('mouseup', handleKeyEnd);
  e.target.removeEventListener('mouseout', handleKeyEnd);
}
