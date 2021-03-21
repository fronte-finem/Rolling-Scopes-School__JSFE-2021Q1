export const PIANO_CFG = [
  genPianoKeyOpt(false, "c", "D"),
  genPianoKeyOpt(true,  "c", "R"),
  genPianoKeyOpt(false, "d", "F"),
  genPianoKeyOpt(true,  "d", "T"),
  genPianoKeyOpt(false, "e", "G"),
  // genPianoKeyOpt(true),
  genPianoKeyOpt(false, "f", "H"),
  genPianoKeyOpt(true,  "f", "U"),
  genPianoKeyOpt(false, "g", "J"),
  genPianoKeyOpt(true,  "g", "I"),
  genPianoKeyOpt(false, "a", "K"),
  genPianoKeyOpt(true,  "a", "O"),
  genPianoKeyOpt(false, "b", "L"),
];

function genPianoKeyOpt(sharp, note, letter) {
  if (!note) return { sharp: sharp };
  return {
    sharp: sharp,
    note: note,
    letter: letter,
    audio: new Audio(`./assets/audio/${note}${sharp ? '♯' : ''}.mp3`)
  };
}
