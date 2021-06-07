import { composeStyles, style } from '@vanilla-extract/css';

const box = style({});

const view = style({});

const button = composeStyles(box, view);

export const BUTTON_CSS_CLASS = {
  button: button.split(' '),
};
