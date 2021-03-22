import { newDiv } from './util.js'

export { PianoKeyModel, PianoKeyView };

class PianoKeyModel {
  constructor (data) {
    this._listeners = [];
    this.update(data);
  }

  update({ sharp, note, letter, audio } = data) {
    this.sharp = sharp ?? this.sharp;
    this.note = note ?? this.note;
    this.letter = letter ?? this.letter;
    this.audio = audio ?? this.audio;
    let isNotSpread = (note ?? letter ?? null) === null;
    isNotSpread || this._listeners.forEach(cb => cb(this.data));
  }

  get data() { return { sharp:this.sharp, note:this.note, letter:this.letter }; }

  subscribe(callback) { this._listeners.push(callback); }
}

class PianoKeyViewBase {
  constructor (pianoKeyModel) {
    let data = pianoKeyModel.data;
    this._base = newDiv(`piano-key-base`);
    data.sharp && this._base.classList.add('sharp');
    this.update(data);
    pianoKeyModel.subscribe(this.update.bind(this));
  }

  update({ note, letter } = data) {
    this._base.dataset.note = note;
    this._base.dataset.letter = letter;
  }

  get base() { return this._base; }
  get letter() { return this._base.dataset.letter; }
  get note() { return this._base.dataset.note; }

  down() { this._base.classList.add('active'); }
  up() { this._base.classList.remove('active'); }
}

class PianoKeyView extends PianoKeyViewBase {
  constructor (opts = { hookIsMouseOverNotAllowed: null }) {
    super(opts);
    this._listeners = {over:[], down:[], up:[]};
    this.onMouseDown(this.down.bind(this));
    this.onMouseUp(this.up.bind(this));

    const [key, face]= ['piano-key', 'piano-key-face'].map(newDiv);
    key.append(face);
    this.base.append(key);

    key.addEventListener('mouseover', this.handleMouseOver.bind(this));
    key.addEventListener('mousedown', this.handleMouseDown.bind(this));
    key.addEventListener('mouseup', this.handleMouseUp.bind(this));
    key.addEventListener('mouseout', this.handleMouseUp.bind(this));
  }

  handleMouseOver(e) {
    if (this._listeners.over.some(stop => stop())) return false;
    this.handleMouseDown(e);
  }

  handleMouseDown(e) {
    if (e.buttons != 1) return false;
    this._listeners.down.forEach(cb => cb());
  }

  handleMouseUp(e) {
    this._listeners.up.forEach(cb => cb());
  }

  onMouseOver(callback) { this._listeners.over.push(callback); }
  onMouseDown(callback) { this._listeners.down.push(callback); }
  onMouseUp(callback) { this._listeners.up.push(callback); }
}
