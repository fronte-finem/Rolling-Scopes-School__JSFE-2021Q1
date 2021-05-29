import { IUser } from 'services/user-service';
import { timeDiff } from 'shared/date-time-utils';

import popupVictoryStyles from '~components/pop-up-victory/pop-up-victory-view.scss';

export const POPUP_SIGN_UP = {
  title: '🦸‍♀️ Registr new Player 🦸',
  btns: {
    addUser: { text: 'add user' },
    cancel: { text: 'cancel', classNames: ['btn--invert'] },
  },
};

export const POPUP_VICTORY = {
  title: '🏆 Victory! 🏆',
  btns: {
    confirm: { text: 'OK' },
  },
  msgGenerator: (user: IUser): string => {
    if (!user.time) return '';
    const { hours, min, sec } = timeDiff(user.time);
    let timeFormat = [`${hours} hours`, `${min} minutes`, `${sec} seconds`];
    timeFormat = user.time > 3600 ? timeFormat : timeFormat.slice(1);
    timeFormat = user.time > 60 ? timeFormat : timeFormat.slice(1);
    return `<div class="${popupVictoryStyles.output}">Congratulations,
      <span class="${popupVictoryStyles.highlight}">${user.firstName} ${
      user.lastName
    }</span>!
      <br>You successfully found all matches in time
      <span class="${popupVictoryStyles.highlight}">${timeFormat.join(
      ' '
    )}</span>
      <br>with score <span class="${popupVictoryStyles.highlight}">${
      user.score
    }</span>.</div>`;
  },
};
