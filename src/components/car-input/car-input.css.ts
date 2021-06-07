import { composeStyles, style } from '@vanilla-extract/css';

const box = style({});
const view = style({});
const carInput = composeStyles(box, view);

const name = style({});

const color = style({});

export const CAR_INPUT_CSS_CLASS = {
  carInput: carInput.split(' '),
  name,
  color,
};
