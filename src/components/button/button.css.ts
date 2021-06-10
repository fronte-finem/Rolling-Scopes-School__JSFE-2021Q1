import { composeStyles, style } from '@vanilla-extract/css';

const reset = style({
  userSelect: 'none',
});

const box = style({});

const view = style({});

const button = composeStyles(reset, box, view);

export const BUTTON_CSS_CLASS = {
  button: button.split(' '),
};
