import { PianoKeyModel, PianoKeyView } from './piano-key.js'
import { genPianoCfg, NOTES_DEFAULT, NOTES_FUNNY } from './piano-cfg.js'
import { playAudio } from './util.js'


export { Piano }

class Piano {
  constructor (root) {
    this._root = root;
    this._keyModels = [];
    this._keyViews = [];
    this._isMouseDown = false;
    this._descr = { notes: true, letters: false };
    this._kbDowns = new Set();

    root.addEventListener('mousedown', (function () { this._isMouseDown = true; }).bind(this));
    root.addEventListener('mouseup', (function () { this._isMouseDown = false; }).bind(this));
    root.addEventListener('mouseleave', (function () { this._isMouseDown = false; }).bind(this));

    window.addEventListener('keydown', (function (e) { e.repeat || this.keyDown(e.code) }).bind(this));
    window.addEventListener('keyup', (function (e) { this.keyUp(e.code) }).bind(this));

    this._cfgs = { empty : [...genPianoCfg((() => ''), NOTES_FUNNY)] };
    this._cfgs.empty.forEach(this.addKey.bind(this));
  }

  addKey(data) {
    let pianoKeyModel = new PianoKeyModel(data);
    let pianoKeyView = new PianoKeyView(pianoKeyModel);
    this._root.append(pianoKeyView.base);

    this._keyModels.push(pianoKeyModel);
    this._keyViews.push(pianoKeyView);

    pianoKeyView.onMouseOver(isMouseOverNotAllowed.bind(this));
    function isMouseOverNotAllowed() { return !this._isMouseDown; }

    pianoKeyView.onMouseDown(() => playAudio(pianoKeyModel.audio));
  }

  addCfg(name, dir, notes = NOTES_DEFAULT) {
    this._cfgs[name] = [...genPianoCfg((note) => `${dir}/${note}.mp3`, notes)];
  }

  setCfg(name) {
    if (name === this._currCfgName) return false;
    if (!this._cfgs[name]) return false;
    const noAudio = name === 'empty';
    this._cfgs[name]?.forEach((data, i) => {
      noAudio || (data.audio ??= new Audio(data.file));
      this._keyModels[i].update(data);
    });
    this._currCfgName = name;
    return true;
  }

  keyDown(keyCode) {
    if (this._kbDowns.has(keyCode)) return false;
    this._kbDowns.add(keyCode);
    let xs = this._keyViews
      .filter(k => `Key${k.letter}` == keyCode)[0]
      ?.handleMouseDown({ buttons: 1 });
  }

  keyUp(keyCode) {
    this._kbDowns.delete(keyCode);
    this._keyViews
      .filter(k => `Key${k.letter}` == keyCode)[0]
      ?.handleMouseUp();
  }

  showLetters() {
    if (this._descr.letters) return false;
    this._root.classList.add('letters');
    return this._descr.letters = !(this._descr.notes = false);
  };

  showNotes() {
    if (this._descr.notes) return false;
    this._root.classList.remove('letters');
    return this._descr.notes = !(this._descr.letters = false);
  };
}
