import { deepFreeze } from 'shared/object-utils';

export const APP_HEADER_CONFIG = deepFreeze({
  btns: {
    signUp: { text: 'register new player' },
    start: { text: 'start game' },
    stop: { text: 'stop game' },
  },
});
