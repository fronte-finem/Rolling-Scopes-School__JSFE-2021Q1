import { IUser } from 'services/user-service';
import { timeDiff } from 'shared/date-time-utils';

import popupVictoryStyles from './pop-up-victory-view.scss';

export function msgGenerator(user: IUser): string {
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
    <span class="${popupVictoryStyles.highlight}">${timeFormat.join(' ')}</span>
    <br>with score <span class="${popupVictoryStyles.highlight}">${
    user.score
  }</span>.</div>`;
}
