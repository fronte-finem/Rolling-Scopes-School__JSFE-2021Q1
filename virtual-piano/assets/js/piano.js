import { newDiv, toggleClass, playAudio } from './util.js'

export { Piano }

class Piano {
  constructor (root) {
    this._root = root;
    this._keys = {};
    this._isMouseDown = false;
    this._toggleLetters = toggleClass.bind(null, 'letters');

    root.addEventListener('mousedown', this.mouseDown.bind(this));
    root.addEventListener('mouseup', this.mouseUp.bind(this));
    root.addEventListener('mouseleave', this.mouseUp.bind(this));
  }

  mouseDown() { this._isMouseDown = true; }
  mouseUp() { this._isMouseDown = false; }
  isMouseOverNotAllowed() { return !this._isMouseDown; }

  addKey(opts = { note: null, letter: null, audio: null, sharp: false }) {
    if (!opts.note) {
      let pianoKeySlot = new PianoKeySlot(opts);
      this._root.append(pianoKeySlot.slot);
      return;
    }
    opts.hookIsMouseOverNotAllowed = this.isMouseOverNotAllowed.bind(this);
    let pianoKey = new PianoKey(opts);
    this._root.append(pianoKey.slot)
    this._keys[pianoKey.keyCode] = pianoKey;
  }

  playKey(keyCode) { this._keys[keyCode]?.play(); }
  stopKey(keyCode) { this._keys[keyCode]?.stop(); }

  toggleLetters(enable = true) {
    this._toggleLetters(enable ? {add:this._root} : {del:this._root});
  }
}


class PianoKeySlot {
  constructor (opts = { sharp: false } ) {
    this._root = newDiv(`piano-key-slot ${opts.sharp ? 'sharp' : ''}`);
  }

  get slot() { return this._root; }
}


class PianoKey extends PianoKeySlot {
  constructor (opts = { note: null,
                        letter: null,
                        audio: null,
                        sharp: false,
                        hookIsMouseOverNotAllowed: null}) {
    super(opts);
    this._key = newDiv('piano-key');
    this._key.append(newDiv('piano-key-face'));
    this._root.append(this._key);

    this._root.dataset.note = opts.note ?? '';
    this._root.dataset.letter = opts.letter ?? '';

    this.keyCode = opts.letter && `Key${opts.letter}`;
    this.audio = opts.audio;

    this._hookIsMouseOverNotAllowed = opts.hookIsMouseOverNotAllowed;

    this._toggleActive = toggleClass.bind(null, 'active');

    this._key.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this._key.addEventListener('mouseover', this.handleMouseOver.bind(this));
  }

  play() {
    this._toggleActive({add: this._root});
    playAudio(this.audio);
  }
  stop() {
    this._toggleActive({del: this._root});
  }

  handleMouseDown(e) {
    if (e.buttons != 1) return false;
    this.handleMouseStart();
  }

  handleMouseOver(e) {
    if (this._hookIsMouseOverNotAllowed()) return false;
    if (e.buttons != 1) return false;
    this.handleMouseStart();
  }

  handleMouseStart() {
    this._key.addEventListener('mouseup', this.handleMouseEnd.bind(this));
    this._key.addEventListener('mouseout', this.handleMouseEnd.bind(this));
    this.play();
  }

  handleMouseEnd() {
    this._key.removeEventListener('mouseup', this.handleMouseEnd.bind(this));
    this._key.removeEventListener('mouseout', this.handleMouseEnd.bind(this));
    this.stop();
  }
}
