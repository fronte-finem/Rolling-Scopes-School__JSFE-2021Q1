import { createVar, style } from '@vanilla-extract/css';
import { CAR_CSS_SIZE } from 'components/car/car.css';
import { getVarName } from 'shared/css-utils';

const colorVar = createVar();

export const TRACK_CSS_VAR = {
  color: getVarName(colorVar),
};

const root = style({
  vars: {
    [TRACK_CSS_VAR.color]: '#111',
  },
});

const buttons = style({
  display: 'flex',
  columnGap: '5px',
});

const wrapper = style({
  backgroundColor: colorVar,
});

const track = style({
  position: 'relative',
  width: `calc(100% - ${CAR_CSS_SIZE.width}px)`,
  height: `${CAR_CSS_SIZE.height + 10}px`,
});

const carName = style({});

export const TRACK_CSS_CLASS = {
  root,
  buttons,
  wrapper,
  track,
  carName,
};
