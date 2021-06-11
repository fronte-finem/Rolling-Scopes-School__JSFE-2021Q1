import { style } from '@vanilla-extract/css';

const root = style({});

const num = style({
  width: '50px',
  height: '15px',
  borderRadius: '50%',
});

const car = style({
  width: '50px',
  height: '15px',
  borderRadius: '50%',
});

const name = style({
  padding: '0 5px',
});

const wins = style({
  padding: '0 5px',
});

const time = style({
  padding: '0 5px',
});

export const WINNER_CSS_CLASS = {
  root,
  num,
  car,
  name,
  wins,
  time,
};
