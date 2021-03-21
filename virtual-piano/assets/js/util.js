export { newDiv, playAudio };

function newDiv(name) {
  let div = document.createElement('div');
  div.className = name;
  return div;
}

function playAudio(audio) {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}
