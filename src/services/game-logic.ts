// Расчет очков игрока должен производиться по следующей формуле:
//   (количество сравнений - количество ошибочных сравнений) * 100 - (время прошедшее с начала в секундах) * 10.
// При этом количество очков не должно быть меньше 0.
// https://docs.google.com/spreadsheets/d/1friRvR7djdTnfTVDhpeTcMEDiD-RIwxHO_V8wcGe65o/edit#gid=0&range=63:63
// имеется ввиду: (количество успешных попыток - число ошибочных ) * 100 - (время прошедшее с начала в секундах) * 10

export type GameMatches = [allMatches: number, errorMatches: number];

export function countScore(
  [allMatches, errorMatches]: GameMatches,
  diffTime: number
): number {
  const successMatches = allMatches - errorMatches;
  const diffMatches = successMatches - errorMatches;
  const score = diffMatches * 100 - diffTime * 10;
  return score < 0 ? 0 : score;
}
