export { genPianoCfg, NOTES_DEFAULT, NOTES_FUNNY }

const NOTES_DEFAULT = 'c c♯ d d♯ e f f♯ g g♯ a a♯ b';
const NOTES_FUNNY = '🍓 😀 🍊 😎 🍋 🥒 😍 🫐 😋 🍆 🤩 🍇';

function* genPianoCfg(getFileName,
                      notes = NOTES_DEFAULT,
                      kbNormal = "D F G H J K L",
                      kbSharp = "R T U I O") {
  notes = notes.split(' '),
  kbNormal = kbNormal.split(' '),
  kbSharp =  kbSharp.split(' ')
  let genOpt = genPianoKeyOpt.bind(null, getFileName);
  yield genOpt(false, notes[0],  kbNormal[0]);
  yield genOpt(true,  notes[1],  kbSharp[0]);
  yield genOpt(false, notes[2],  kbNormal[1]);
  yield genOpt(true,  notes[3],  kbSharp[1]);
  yield genOpt(false, notes[4],  kbNormal[2]);
  yield genOpt(false, notes[5],  kbNormal[3]);
  yield genOpt(true,  notes[6],  kbSharp[2]);
  yield genOpt(false, notes[7],  kbNormal[4]);
  yield genOpt(true,  notes[8],  kbSharp[3]);
  yield genOpt(false, notes[9],  kbNormal[5]);
  yield genOpt(true,  notes[10], kbSharp[4]);
  yield genOpt(false, notes[11], kbNormal[6]);
}

function genPianoKeyOpt(getFileName, sharp, note, letter) {
  return {
    sharp: sharp,
    note: note,
    letter: letter,
    file: getFileName(note)
  };
}
