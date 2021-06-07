import { composeStyles, style } from '@vanilla-extract/css';

const position = style({
  zIndex: 10,
  position: 'fixed',
  left: '0%',
  right: '0%',
  top: '0%',
  bottom: '0%',
});

const view = style({
  background: '#0008',
  backdropFilter: 'blur(2px)',
  pointerEvents: 'all',
  transition: 'all 500ms',
});

const modal = composeStyles(position, view);

const hidden = style({
  zIndex: -10,
  top: '100%',
  background: 'transparent',
  pointerEvents: 'none',
});

const bodyHidden = style({
  overflow: 'hidden',
});

export const MODAL_CSS_CLASS = {
  modal: modal.split(' '),
  hidden,
  bodyHidden,
};
