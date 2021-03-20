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
  pKey.myKey = `Key${pKey.parentElement.dataset.letter}`;
});

function playAudio(audio) {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

function handleKeyStart(e) {
  if (e.buttons != 1) return false;
  toggleActive({add: [e.target, e.target.parentElement]});
  e.target.addEventListener('mouseup', handleKeyEnd);
  e.target.addEventListener('mouseout', handleKeyEnd);
  playAudio(e.target.myAudio);
}

function handleKeyEnd(e) {
  toggleActive({del: [e.target, e.target.parentElement]});
  e.target.removeEventListener('mouseup', handleKeyEnd);
  e.target.removeEventListener('mouseout', handleKeyEnd);
}

document.addEventListener('keydown', (e) => {
  if (e.repeat) return false;
  Array
    .from(piano.querySelectorAll('.piano-key'))
    .filter(pKey => pKey.myKey == e.code)
    .forEach(pKey => { toggleActive({add: [pKey, pKey.parentElement]}); playAudio(pKey.myAudio) })
});

document.addEventListener('keyup', (e) => {
  Array
    .from(piano.querySelectorAll('.piano-key'))
    .filter(pKey => pKey.myKey == e.code)
    .forEach(pKey => toggleActive({del: [pKey, pKey.parentElement]}));
});
