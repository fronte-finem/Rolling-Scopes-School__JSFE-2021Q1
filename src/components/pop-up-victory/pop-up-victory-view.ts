import {
  APP_POPUP_VICTORY_CONFIG,
  PopUpVictoryBtns,
} from '../../app/configs/popups.config';
import { IUser, IUserService } from '../../services/user-service';
import { timeDiff } from '../../shared/date-time-utils';
import { BtnView } from '../../shared/views/btn/btn';
import { View } from '../../shared/views/view';
import { PopUpView } from '../pop-up/pop-up-view';

import styles from './pop-up-victory-view.scss';

const createBtn = (key: PopUpVictoryBtns, ...classNames: string[]): BtnView =>
  new BtnView({ ...APP_POPUP_VICTORY_CONFIG.btns[key], classNames });

const msgGenerator = (user: IUser) => {
  const { hours, min, sec } = timeDiff(user.time);
  let timeFormat = [`${hours} hours`, `${min} minutes`, `${sec} seconds`];
  timeFormat = user.time > 3600 ? timeFormat : timeFormat.slice(1);
  timeFormat = user.time > 60 ? timeFormat : timeFormat.slice(1);
  return new View(
    `<div class="${styles.output}">Congratulations,
    <span class="${styles.highlight}">${user.firstName} ${user.lastName}</span>!
    <br>You successfully found all matches in time
    <span class="${styles.highlight}">${timeFormat.join(' ')}</span>
    <br>with score <span class="${styles.highlight}">${
      user.score
    }</span>.</div>`
  );
};

export class PopUpVictoryView extends PopUpView {
  private btnConfirn = createBtn('confirm');

  public constructor(private readonly userService: IUserService, time = NaN) {
    super(APP_POPUP_VICTORY_CONFIG.title);
    this.init(time, this.userService.currentUser);
  }

  private init(time: number, user: IUser | undefined) {
    if (!user) return;
    this.addContent(msgGenerator(user));
    this.addButtons(this.btnConfirn);
  }

  public task(): Promise<boolean> {
    return new Promise((resolve) => {
      this.btnConfirn.onClick(() => resolve(true));
    });
  }
}
