import styled from 'styled-components';

export const Cell = styled.td`
  padding: 3px 6px;
`;
export const CellNum = styled(Cell)`
  background: #0002;
`;
export const CellCategory = styled(Cell)`
  background: #fff0;
`;
export const CellWord = styled(Cell)`
  background: #fff4;
`;
export const CellTranslation = styled(Cell)`
  background: #fff0;
`;
export const StatsCell = styled(Cell)`
  width: 50px;
  font-family: monospace;
`;

export const CellAll = styled(StatsCell)`
  color: #fff;
`;

export const CellTrainAll = styled(CellAll)`
  background: hsla(240, 80%, 30%, 0.75);
  color: hsl(240, 80%, 90%);
`;

export const CellAskSum = styled(StatsCell)`
  background: hsl(280, 80%, 70%, 0.75);
  color: hsl(280, 80%, 10%);
`;
export const CellAskPercent = styled(StatsCell)`
  background: hsl(280, 80%, 80%, 0.75);
  color: hsl(280, 80%, 20%);
`;

export const CellFlipSum = styled(StatsCell)`
  background: hsl(320, 80%, 70%, 0.75);
  color: hsl(320, 80%, 10%);
`;
export const CellFlipPercent = styled(StatsCell)`
  background: hsl(320, 80%, 80%, 0.75);
  color: hsl(320, 80%, 20%);
`;

export const CellGameAll = styled(CellAll)`
  background: hsl(80, 80%, 30%, 0.75);
  color: hsl(80, 80%, 90%);
`;

export const CellMatchSum = styled(StatsCell)`
  background: hsl(40, 80%, 70%, 0.75);
  color: hsl(40, 80%, 20%);
`;
export const CellMatchPercent = styled(StatsCell)`
  background: hsl(40, 80%, 80%, 0.75);
  color: hsl(40, 80%, 20%);
`;

export const CellErrorSum = styled(StatsCell)`
  background: hsl(0, 80%, 70%, 0.75);
  color: hsl(0, 80%, 10%);
`;
export const CellErrorPercent = styled(StatsCell)`
  background: hsl(0, 80%, 80%, 0.75);
  color: hsl(0, 80%, 20%);
`;
