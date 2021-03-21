import { newDiv, playAudio } from './util.js'

export { Piano }

class Piano {
  constructor (root, {btnNotes, btnLetters} = btns) {
    this._root = root;
    this._keys = {};
    this._isMouseDown = false;
    this._descr = { notes: true, letters: false };

    root.addEventListener('mousedown', mouseDown.bind(this));
    root.addEventListener('mouseup', mouseUp.bind(this));
    root.addEventListener('mouseleave', mouseUp.bind(this));

    function mouseDown() { this._isMouseDown = true; }
    function mouseUp() { this._isMouseDown = false; }

    btnNotes?.addEventListener('click', showNotes.bind(this));
    btnLetters?.addEventListener('click', showLetters.bind(this));

    function showLetters() {
      if (this._descr.letters) return;
      this._descr.letters = !(this._descr.notes = false);
      btnNotes.classList.remove('btn-active');
      btnLetters.classList.add('btn-active');
      this._root.classList.add('letters');
    };

    function showNotes() {
      if (this._descr.notes) return;
      this._descr.notes = !(this._descr.letters = false);
      btnNotes.classList.add('btn-active');
      btnLetters.classList.remove('btn-active');
      this._root.classList.remove('letters');
    };
  }

  addKey(opts = { letter: null }) {
    opts.hookIsMouseOverNotAllowed = isMouseOverNotAllowed.bind(this);
    let pianoKey = new PianoKey(opts);
    this._root.append(pianoKey.slot)
    this._keys[`Key${opts.letter}`] = pianoKey;

    function isMouseOverNotAllowed() { return !this._isMouseDown; }
  }

  keyDown(keyCode) { this._keys[keyCode]?.down(); }
  keyUp(keyCode) { this._keys[keyCode]?.up(); }
}


class PianoKeySlot {
  constructor ({ sharp, audio, note, letter } = opts ) {
    this._root = newDiv(`piano-key-slot`);
    sharp && this._root.classList.add('sharp');
    this._audio = audio;
    this._root.dataset.note = note;
    this._root.dataset.letter = letter;
  }

  get slot() { return this._root; }

  down() {
    this._root.classList.add('active');
    playAudio(this._audio);
  }

  up() {
    this._root.classList.remove('active');
  }
}


class PianoKey extends PianoKeySlot {
  constructor (opts = { hookIsMouseOverNotAllowed: null }) {
    super(opts);
    this._hookIsMouseOverNotAllowed = opts.hookIsMouseOverNotAllowed;

    const [key, face]= ['piano-key', 'piano-key-face'].map(newDiv);
    key.append(face);
    this._root.append(key);

    key.addEventListener('mousedown', this.handleMouseDown.bind(this));
    key.addEventListener('mouseover', this.handleMouseOver.bind(this));
    key.addEventListener('mouseup', this.up.bind(this));
    key.addEventListener('mouseout', this.up.bind(this));
  }

  handleMouseOver(e) {
    if (this._hookIsMouseOverNotAllowed()) return false;
    this.handleMouseDown(e);
  }

  handleMouseDown(e) {
    if (e.buttons != 1) return false;
    this.down();
  }
}
