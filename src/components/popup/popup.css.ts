import { composeStyles, style } from '@vanilla-extract/css';

const box = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const position = style({
  zIndex: 11,
  position: 'fixed',
  left: '30%',
  right: '30%',
  top: '30%',
  bottom: '30%',
});

const view = style({
  borderRadius: '50px',
  background: '#0008',
  backdropFilter: 'blur(2px)',
  pointerEvents: 'all',
  transition: 'all 500ms',
});

const font = style({
  fontFamily: '"Fira Mono", monospace',
  fontWeight: 300,
  fontSize: '30px',
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
});

const popup = composeStyles(box, position, view, font);

const hidden = style({
  zIndex: -10,
  transform: 'translateY(-200%)',
  background: 'transparent',
  pointerEvents: 'none',
});

export const POPUP_CSS_CLASS = {
  popup: popup.split(' '),
  hidden,
};
