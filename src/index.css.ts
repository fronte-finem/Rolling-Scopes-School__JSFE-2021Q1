import { createTheme, style } from '@vanilla-extract/css';

export const [theme, vars] = createTheme({
  color: {
    dark: '#222',
  },
});

export const root = style({
  backgroundColor: vars.color.dark,
  color: 'white',
  margin: 0,
  padding: 10,
});
