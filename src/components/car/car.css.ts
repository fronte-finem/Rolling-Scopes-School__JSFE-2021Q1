import { composeStyles, createVar, style } from '@vanilla-extract/css';
import { getVarName } from 'shared/css-utils';

const colorVar = createVar();
const positionVar = createVar();

export const CAR_CSS_SIZE = {
  width: 100,
  height: 50,
};

export const CAR_CSS_VAR = {
  color: getVarName(colorVar),
  position: getVarName(positionVar),
};

const position = style({
  vars: {
    [CAR_CSS_VAR.color]: '#fff',
    [CAR_CSS_VAR.position]: '0%',
  },
  position: 'absolute',
  left: positionVar,
  top: '50%',
  transform: 'translateY(-50%)',
  width: `${CAR_CSS_SIZE.width}px`,
  height: `${CAR_CSS_SIZE.height}px`,
});

const MARK_COLOR = '#000';
const getGradient = (angle: number, color: string) =>
  `repeating-linear-gradient(${angle}deg, ${color} 0px 2px, transparent 2px 10px)`;

const view = style({
  border: `2px solid ${MARK_COLOR}`,
  borderRadius: '50%',
  backgroundColor: colorVar,
  backgroundPosition: 'center',
  backgroundSize: '10px 10px',
});

const broken = style({
  backgroundImage: getGradient(90, MARK_COLOR),
});
const finish = style({
  backgroundImage: getGradient(0, MARK_COLOR),
});

export const CAR_CSS_CLASS = {
  car: composeStyles(position, view).split(' '),
  broken,
  finish,
};
