export { newDiv, toggleClass, playAudio };

function newDiv(className = '') {
  let div = document.createElement('div');
  div.className = className;
  return div;
}

function toggleClass(cls = '', opts = {add:[], del:[]}) {
  if (opts == undefined) return;

  if (Array.isArray(opts.add)) {
    opts.add.forEach(x => x?.classList.add(cls));
  } else {
    opts.add?.classList.add(cls);
  }

  if (Array.isArray(opts.del)) {
    opts.del.forEach(x => x?.classList.remove(cls));
  } else {
    opts.del?.classList.remove(cls);
  }
}

function playAudio(audio) {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}
