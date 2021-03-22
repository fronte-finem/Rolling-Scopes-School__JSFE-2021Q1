export { newDiv, newBtn, newElem, playAudio };

const newDiv = newElem.bind(null, 'div');
const newBtn = newElem.bind(null, 'button');

function newElem(tagName, className) {
  let elem = document.createElement(tagName);
  elem.className = className;
  return elem;
}

function playAudio(audio) {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}
