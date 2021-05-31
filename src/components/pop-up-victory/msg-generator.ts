import { IUser } from 'services/user-service';
import { timeDiff } from 'shared/date-time-utils';

import popupVictoryStyles from './pop-up-victory-view.scss';

const MESSAGE = {
  intro: 'Congratulations',
  time: '!<br>You successfully found all matches in time',
  score: '<br>with score ',
};

export function msgGenerator(user: IUser): string {
  if (!user.time) return '';
  const { hours, min, sec } = timeDiff(user.time);
  let timeFormat = [`${hours} hours`, `${min} minutes`, `${sec} seconds`];
  timeFormat = user.time > 3600 ? timeFormat : timeFormat.slice(1);
  timeFormat = user.time > 60 ? timeFormat : timeFormat.slice(1);
  return `<div class="${popupVictoryStyles.output}">${
    MESSAGE.intro
  }, <span class="${popupVictoryStyles.highlight}">${user.firstName} ${
    user.lastName
  }</span>${MESSAGE.time}<span class="${
    popupVictoryStyles.highlight
  }">${timeFormat.join(' ')}</span>${MESSAGE.score} <span class="${
    popupVictoryStyles.highlight
  }">${user.score}</span>.</div>`;
}
