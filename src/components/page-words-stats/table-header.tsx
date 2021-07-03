import React from 'react';

import {
  HeadCellAsk,
  HeadCellAskPercent,
  HeadCellAskSum,
  HeadCellCategory,
  HeadCellError,
  HeadCellErrorPercent,
  HeadCellErrorSum,
  HeadCellFlip,
  HeadCellFlipPercent,
  HeadCellFlipSum,
  HeadCellGame,
  HeadCellGameAll,
  HeadCellMatch,
  HeadCellMatchPercent,
  HeadCellMatchSum,
  HeadCellNum,
  HeadCellTrain,
  HeadCellTrainAll,
  HeadCellTranslation,
  HeadCellWord,
} from './table-header-style';
import { Thead } from './table-style';

export const TableHeader: React.FC = () => {
  return (
    <Thead>
      <tr>
        <HeadCellNum rowSpan={3}>№</HeadCellNum>
        <HeadCellCategory rowSpan={3}>Category</HeadCellCategory>
        <HeadCellWord rowSpan={3}>Word</HeadCellWord>
        <HeadCellTranslation rowSpan={3}>Translation</HeadCellTranslation>
        <HeadCellTrain colSpan={5}>Train</HeadCellTrain>
        <HeadCellGame colSpan={5}>Game</HeadCellGame>
      </tr>
      <tr>
        <HeadCellTrainAll rowSpan={2}>all</HeadCellTrainAll>
        <HeadCellAsk colSpan={2}>ask</HeadCellAsk>
        <HeadCellFlip colSpan={2}>flip</HeadCellFlip>
        <HeadCellGameAll rowSpan={2}>all</HeadCellGameAll>
        <HeadCellMatch colSpan={2}>match</HeadCellMatch>
        <HeadCellError colSpan={2}>error</HeadCellError>
      </tr>
      <tr>
        <HeadCellAskSum>sum</HeadCellAskSum>
        <HeadCellAskPercent>%</HeadCellAskPercent>
        <HeadCellFlipSum>sum</HeadCellFlipSum>
        <HeadCellFlipPercent>%</HeadCellFlipPercent>
        <HeadCellMatchSum>sum</HeadCellMatchSum>
        <HeadCellMatchPercent>%</HeadCellMatchPercent>
        <HeadCellErrorSum>sum</HeadCellErrorSum>
        <HeadCellErrorPercent>%</HeadCellErrorPercent>
      </tr>
    </Thead>
  );
};
