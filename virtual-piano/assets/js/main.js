const piano = document.querySelector('.piano');

let onPiano = false;

piano.addEventListener('mouseenter', e => onPiano = true);
piano.addEventListener('mouseleave', e => onPiano = false);

piano.querySelectorAll('.piano-key').forEach(pKey => {
  pKey.addEventListener('mousedown', handleKeyStart);
  pKey.addEventListener('mouseover', handleKeyStart);
})

function handleKeyStart(e) {
  if (e.buttons != 1) return false;
  e.target.classList.add('active');
  e.target.parentElement.classList.add('active');
  e.target.addEventListener('mouseup', handleKeyEnd);
  e.target.addEventListener('mouseout', handleKeyEnd);
  console.log(this, e);
}

function handleKeyEnd(e) {
  e.target.classList.remove('active');
  e.target.parentElement.classList.remove('active');
  e.target.removeEventListener('mouseup', handleKeyEnd);
  e.target.removeEventListener('mouseout', handleKeyEnd);
  console.log(this, e);
}
