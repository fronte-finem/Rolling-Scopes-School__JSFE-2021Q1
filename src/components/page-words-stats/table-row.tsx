import React from 'react';

import { ViewWordStat } from 'services/word-stat/model';

import { BodyCell } from './cell-style';

interface RowProps {
  stat: ViewWordStat;
}

export const Row: React.FC<RowProps> = ({ stat }) => {
  return (
    <tr>
      <BodyCell className="num">{stat.index}</BodyCell>
      <BodyCell className="category">{stat.category}</BodyCell>
      <BodyCell className="word">{stat.word}</BodyCell>
      <BodyCell className="translation">{stat.translation}</BodyCell>
      <BodyCell className="stats train all">{stat.totalTrain}</BodyCell>
      <BodyCell className="stats train-ask-a">{stat.listenCount}</BodyCell>
      <BodyCell className="stats train-ask-b">{stat.listenPercent}</BodyCell>
      <BodyCell className="stats train-flip-a">{stat.translateCount}</BodyCell>
      <BodyCell className="stats train-flip-b">{stat.translatePercent}</BodyCell>
      <BodyCell className="stats game all">{stat.totalGame}</BodyCell>
      <BodyCell className="stats game-match-a">{stat.matchCount}</BodyCell>
      <BodyCell className="stats game-match-b">{stat.matchPercent}</BodyCell>
      <BodyCell className="stats game-error-a">{stat.errorCount}</BodyCell>
      <BodyCell className="stats game-error-b">{stat.errorPercent}</BodyCell>
    </tr>
  );
};
