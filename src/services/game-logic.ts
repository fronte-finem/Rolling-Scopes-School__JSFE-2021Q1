// Расчет очков игрока должен производиться по следующей формуле:
//   (количество сравнений - количество ошибочных сравнений) * 100 - (время прошедшее с начала в секундах) * 10.
// При этом количество очков не должно быть меньше 0.
// https://docs.google.com/spreadsheets/d/1friRvR7djdTnfTVDhpeTcMEDiD-RIwxHO_V8wcGe65o/edit#gid=0&range=63:63
// имеется ввиду: (количество успешных попыток - число ошибочных ) * 100 - (время прошедшее с начала в секундах) * 10

import { APP_GAME_SETTINGS } from 'app/configs/game.config';

import { IGameSettings } from './game-settings';

export type GameMatches = [allMatches: number, errorMatches: number];

const MIN_AMOUNT = APP_GAME_SETTINGS.cardsField
  .map((cf) => cf.getCardsAmount())
  .sort()[0];

const MAX_INITIAL_TIME = [...APP_GAME_SETTINGS.initialShowTime].sort(
  (a, b) => b - a
)[0];

const MAX_MISMATCH_TIME = [...APP_GAME_SETTINGS.mismatchShowTime].sort(
  (a, b) => b - a
)[0];

export function calcModifier(settings: IGameSettings): number {
  const { cardsField, initialShowTime, mismatchShowTime } = settings;
  const amountMod = cardsField.getCardsAmount() / MIN_AMOUNT;
  const initialTimeMod = MAX_INITIAL_TIME / initialShowTime;
  const mismatchTimeMod = MAX_MISMATCH_TIME / mismatchShowTime;
  return 0.25 * amountMod * initialTimeMod + 0.1 * mismatchTimeMod;
}

export function calcScore(
  [allMatches, errorMatches]: GameMatches,
  diffTime: number,
  settings: IGameSettings
): number {
  const modifier = calcModifier(settings);
  const successMatches = allMatches - errorMatches;
  const diffMatches = modifier * successMatches - errorMatches;
  const score = diffMatches * 100 - diffTime * 10;
  return score < 0 ? 0 : score;
}
