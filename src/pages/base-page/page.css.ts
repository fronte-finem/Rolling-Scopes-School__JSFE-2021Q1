import { style } from '@vanilla-extract/css';

const hidden = style({
  display: 'none',
});

const page = style({});

const title = style({});

const pageNum = style({});

const content = style({});

export const PAGE_CSS_CLASS = {
  hidden,
  page,
  title,
  pageNum,
  content,
};
