import React from 'react';

import { WordStats } from 'services/stats/word-stats';

import { BodyCell } from './cell-style';
import { OrderField } from 'components/page-words-stats/table-header';
import { WordDTO } from 'services/data/dto-word';

export interface RowProps {
  id: number;
  index?: number;
  data: Record<OrderField, string | number>;
}

const formatPercents = (all: number, part: number) => Math.round((part / all) * 100) || 0;

export function getRowProps(category: string, wordDTO: WordDTO, stats: WordStats): RowProps {
  const [, ask, flip, game, match] = stats;
  const train = ask + flip;
  const error = game - match;
  return {
    id: wordDTO.id,
    data: {
      [OrderField.CATEGORY]: category,
      [OrderField.WORD]: wordDTO.word,
      [OrderField.TRANSLATION]: wordDTO.translation,
      [OrderField.TRAIN]: train,
      [OrderField.ASK_COUNT]: ask,
      [OrderField.ASK_PERCENT]: formatPercents(train, ask),
      [OrderField.FLIP_COUNT]: flip,
      [OrderField.FLIP_PERCENT]: formatPercents(train, flip),
      [OrderField.GAME]: game,
      [OrderField.MATCH_COUNT]: match,
      [OrderField.MATCH_PERCENT]: formatPercents(game, match),
      [OrderField.ERROR_COUNT]: error,
      [OrderField.ERROR_PERCENT]: formatPercents(game, error),
    },
  };
}

export const Row: React.FC<RowProps> = ({ index, data }) => {
  return (
    <tr>
      <BodyCell className="num">{index}</BodyCell>
      <BodyCell className="category">{data[OrderField.CATEGORY]}</BodyCell>
      <BodyCell className="word">{data[OrderField.WORD]}</BodyCell>
      <BodyCell className="translation">{data[OrderField.TRANSLATION]}</BodyCell>
      <BodyCell className="stats train all">{data[OrderField.TRAIN]}</BodyCell>
      <BodyCell className="stats train-ask-a">{data[OrderField.ASK_COUNT]}</BodyCell>
      <BodyCell className="stats train-ask-b">{data[OrderField.ASK_PERCENT]}</BodyCell>
      <BodyCell className="stats train-flip-a">{data[OrderField.FLIP_COUNT]}</BodyCell>
      <BodyCell className="stats train-flip-b">{data[OrderField.FLIP_PERCENT]}</BodyCell>
      <BodyCell className="stats game all">{data[OrderField.GAME]}</BodyCell>
      <BodyCell className="stats game-match-a">{data[OrderField.MATCH_COUNT]}</BodyCell>
      <BodyCell className="stats game-match-b">{data[OrderField.MATCH_PERCENT]}</BodyCell>
      <BodyCell className="stats game-error-a">{data[OrderField.ERROR_COUNT]}</BodyCell>
      <BodyCell className="stats game-error-b">{data[OrderField.ERROR_PERCENT]}</BodyCell>
    </tr>
  );
};
