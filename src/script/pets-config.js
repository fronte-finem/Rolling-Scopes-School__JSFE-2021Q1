export const petsData = getPetsData();

/** @typedef {Map<string, string>} PetsData
 *
 * @returns {PetsData}
*/
function getPetsData() {
  return new Map([
      ['panda',     'Lukas the Panda'],
      ['lemur',     'Andy the Lemur'],
      ['gorilla',   'Glen the Gorilla'],
      ['alligator', 'Mike the Alligator'],
      ['eagle',     'Sam & Lora the eagles family'],
      ['koala',     'Liz the Koala'],
      ['lion',      'Shake the Lion'],
      ['tiger',     'Senja the Tiger'],
  ]);
}
