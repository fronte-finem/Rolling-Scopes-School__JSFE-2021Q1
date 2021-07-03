import styled from 'styled-components';

export const HeadCell = styled.th`
  padding: 10px;
  font-size: 16px;
  font-weight: lighter;
  letter-spacing: 2px;
  text-align: center;
`;

export const HeadCellNum = styled(HeadCell)`
  background: #0008;
`;

export const HeadCellCategory = styled(HeadCell)`
  background: #0002;
  color: #0008;
`;
export const HeadCellWord = styled(HeadCell)`
  background: #0004;
  color: #000b;
`;
export const HeadCellTranslation = styled(HeadCell)`
  background: #0002;
  color: #0008;
`;

export const HeadStatsCell = styled(HeadCell)``;

export const HeadCellTrain = styled(HeadStatsCell)`
  background: hsl(240, 80%, 30%);
  color: hsl(240, 80%, 90%);
`;
export const HeadCellTrainAll = styled(HeadCellTrain)`
  background: hsl(240, 80%, 30%);
  color: hsl(240, 80%, 90%);
`;
export const HeadCellAsk = styled(HeadStatsCell)`
  background: hsl(280, 80%, 70%);
  color: hsl(280, 80%, 10%);
`;
export const HeadCellAskSum = styled(HeadStatsCell)`
  background: hsl(280, 80%, 70%);
  color: hsl(280, 80%, 10%);
`;
export const HeadCellAskPercent = styled(HeadStatsCell)`
  background: hsl(280, 80%, 80%);
  color: hsl(280, 80%, 20%);
`;
export const HeadCellFlip = styled(HeadStatsCell)`
  background: hsl(320, 80%, 70%);
  color: hsl(320, 80%, 10%);
`;
export const HeadCellFlipSum = styled(HeadStatsCell)`
  background: hsl(320, 80%, 70%);
  color: hsl(320, 80%, 10%);
`;
export const HeadCellFlipPercent = styled(HeadStatsCell)`
  background: hsl(320, 80%, 80%);
  color: hsl(320, 80%, 20%);
`;

export const HeadCellGame = styled(HeadStatsCell)`
  background: hsl(80, 80%, 30%);
  color: hsl(80, 80%, 90%);
`;
export const HeadCellGameAll = styled(HeadCellTrain)`
  background: hsl(80, 80%, 30%);
  color: hsl(80, 80%, 90%);
`;
export const HeadCellMatch = styled(HeadStatsCell)`
  background: hsl(40, 80%, 70%);
  color: hsl(40, 80%, 20%);
`;
export const HeadCellMatchSum = styled(HeadStatsCell)`
  background: hsl(40, 80%, 70%);
  color: hsl(40, 80%, 20%);
`;
export const HeadCellMatchPercent = styled(HeadStatsCell)`
  background: hsl(40, 80%, 80%);
  color: hsl(40, 80%, 20%);
`;
export const HeadCellError = styled(HeadStatsCell)`
  background: hsl(0, 80%, 70%);
  color: hsl(0, 80%, 10%);
`;
export const HeadCellErrorSum = styled(HeadStatsCell)`
  background: hsl(0, 80%, 70%);
  color: hsl(0, 80%, 10%);
`;
export const HeadCellErrorPercent = styled(HeadStatsCell)`
  background: hsl(0, 80%, 80%);
  color: hsl(0, 80%, 20%);
`;
