import React from 'react';

import {
  CellAskPercent,
  CellAskSum,
  CellCategory,
  CellErrorPercent,
  CellErrorSum,
  CellFlipPercent,
  CellFlipSum,
  CellGameAll,
  CellMatchPercent,
  CellMatchSum,
  CellNum,
  CellTrainAll,
  CellTranslation,
  CellWord,
} from 'components/page-words-stats/table-row-style';
import { WordStats } from 'services/stats/word-stats';

interface WordRowProps {
  index: number;
  category: string;
  word: string;
  translation: string;
  stats: WordStats;
}

const formatPercents = (all: number, part: number) => Math.round((part / all) * 100) || 0;

export const TableRow: React.FC<WordRowProps> = ({
  index,
  category,
  word,
  translation,
  stats: [, ask, flip, game, match],
}) => {
  const train = ask + flip;
  const error = game - match;

  return (
    <tr>
      <CellNum>{index}</CellNum>
      <CellCategory>{category}</CellCategory>
      <CellWord>{word}</CellWord>
      <CellTranslation>{translation}</CellTranslation>
      <CellTrainAll>{train}</CellTrainAll>
      <CellAskSum>{ask}</CellAskSum>
      <CellAskPercent>{formatPercents(train, ask)}</CellAskPercent>
      <CellFlipSum>{flip}</CellFlipSum>
      <CellFlipPercent>{formatPercents(train, flip)}</CellFlipPercent>
      <CellGameAll>{game}</CellGameAll>
      <CellMatchSum>{match}</CellMatchSum>
      <CellMatchPercent>{formatPercents(game, match)}</CellMatchPercent>
      <CellErrorSum>{error}</CellErrorSum>
      <CellErrorPercent>{formatPercents(game, error)}</CellErrorPercent>
    </tr>
  );
};
