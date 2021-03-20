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

piano.addEventListener('mouseenter', e => onPiano = e.buttons == 0);
piano.addEventListener('mouseleave', e => onPiano = false);

piano.querySelectorAll('.piano-key').forEach(pKey => {
  pKey.addEventListener('mousedown', handleMouseDown);
  pKey.addEventListener('mouseover', handleMouseOver);
  pKey.myAudio = new Audio(`./assets/audio/${pKey.parentElement.dataset.note}.mp3`);
  pKey.myKey = `Key${pKey.parentElement.dataset.letter}`;
});

function playAudio(audio) {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

function handleMouseDown(e) {
  if (e.buttons != 1) return false;
  onPiano = true;
  handleMouseStart(e);
}

function handleMouseOver(e) {
  if (e.buttons != 1 || !onPiano) return false;
  handleMouseStart(e);
}

function handleMouseStart(e) {
  toggleActive({add: [e.target.parentElement]});
  e.target.addEventListener('mouseup', handleMouseEnd);
  e.target.addEventListener('mouseout', handleMouseEnd);
  playAudio(e.target.myAudio);
}
function handleMouseEnd(e) {
  toggleActive({del: [e.target.parentElement]});
  e.target.removeEventListener('mouseup', handleMouseEnd);
  e.target.removeEventListener('mouseout', handleMouseEnd);
}

document.addEventListener('keydown', (e) => {
  if (e.repeat) return false;
  Array
    .from(piano.querySelectorAll('.piano-key'))
    .filter(pKey => pKey.myKey == e.code)
    .forEach(pKey => { toggleActive({add: [pKey.parentElement]}); playAudio(pKey.myAudio) })
});

document.addEventListener('keyup', (e) => {
  Array
    .from(piano.querySelectorAll('.piano-key'))
    .filter(pKey => pKey.myKey == e.code)
    .forEach(pKey => toggleActive({del: [pKey.parentElement]}));
});
