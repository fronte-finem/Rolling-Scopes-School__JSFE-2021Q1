import { createVar, style } from '@vanilla-extract/css';
import { getVarName } from 'shared/css-utils';

const colorVar = createVar();
const brokenVar = createVar();
const positionVar = createVar();

export const CAR_CSS_SIZE = {
  width: 100,
  height: 50,
};

export const CAR_CSS_VAR = {
  color: getVarName(colorVar),
  broken: getVarName(brokenVar),
  position: getVarName(positionVar),
};

const frame = style({
  vars: {
    [CAR_CSS_VAR.color]: 'blue',
    [CAR_CSS_VAR.broken]: 'transparent',
    [CAR_CSS_VAR.position]: '0%',
  },
  position: 'absolute',
  left: positionVar,
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'grid',
  width: `${CAR_CSS_SIZE.width}px`,
  height: `${CAR_CSS_SIZE.height}px`,
});

const broken = style({
  vars: {
    [CAR_CSS_VAR.broken]: 'black',
  },
});

const getGradient = (angle: number, color: string) =>
  `repeating-linear-gradient(${angle}deg, ${color} 0px 2px, transparent 2px 10px)`;

const body = style({
  border: `2px solid ${brokenVar}`,
  borderRadius: '50%',
  backgroundColor: colorVar,
  backgroundImage: `${getGradient(45, brokenVar)}, ${getGradient(-45, brokenVar)}`,
});

export const CAR_CSS_CLASS = {
  frame,
  body,
  broken,
};
