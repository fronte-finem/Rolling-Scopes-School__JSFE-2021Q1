import React from 'react';

import { StatsField, WordStatsExtend } from 'services/stats/word-stats-extend';

import { BodyCell } from './cell-style';

export interface RowProps extends WordStatsExtend {
  index?: number;
}

export const Row: React.FC<RowProps> = ({ index, data }) => {
  return (
    <tr>
      <BodyCell className="num">{index}</BodyCell>
      <BodyCell className="category">{data[StatsField.CATEGORY]}</BodyCell>
      <BodyCell className="word">{data[StatsField.WORD]}</BodyCell>
      <BodyCell className="translation">{data[StatsField.TRANSLATION]}</BodyCell>
      <BodyCell className="stats train all">{data[StatsField.TRAIN]}</BodyCell>
      <BodyCell className="stats train-ask-a">{data[StatsField.ASK_COUNT]}</BodyCell>
      <BodyCell className="stats train-ask-b">{data[StatsField.ASK_PERCENT]}</BodyCell>
      <BodyCell className="stats train-flip-a">{data[StatsField.FLIP_COUNT]}</BodyCell>
      <BodyCell className="stats train-flip-b">{data[StatsField.FLIP_PERCENT]}</BodyCell>
      <BodyCell className="stats game all">{data[StatsField.GAME]}</BodyCell>
      <BodyCell className="stats game-match-a">{data[StatsField.MATCH_COUNT]}</BodyCell>
      <BodyCell className="stats game-match-b">{data[StatsField.MATCH_PERCENT]}</BodyCell>
      <BodyCell className="stats game-error-a">{data[StatsField.ERROR_COUNT]}</BodyCell>
      <BodyCell className="stats game-error-b">{data[StatsField.ERROR_PERCENT]}</BodyCell>
    </tr>
  );
};
