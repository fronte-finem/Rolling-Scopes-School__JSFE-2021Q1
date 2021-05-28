import { IBtnConfig } from './buttons.config';

export interface IHeaderConfig {
  readonly btns: Record<string, IBtnConfig>;
}

export const APP_HEADER_CONFIG: Readonly<IHeaderConfig> = {
  btns: {
    signUp: { text: 'register new player' },
    start: { text: 'start game' },
    stop: { text: 'stop game' },
  },
};
