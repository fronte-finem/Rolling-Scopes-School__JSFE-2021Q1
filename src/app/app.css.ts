import { composeStyles, style } from '@vanilla-extract/css';

const box = style({});

const view = style({});

const app = composeStyles(box, view);

export const APP_CSS_CLASS = {
  app: app.split(' '),
};
