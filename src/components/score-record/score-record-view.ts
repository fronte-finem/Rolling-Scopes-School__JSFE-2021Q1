import { IUser } from 'services/user-service';
import { timeDiffFormat } from 'shared/date-time-utils';
import { renderAvatar } from 'shared/views/avatar-factory';
import { View } from 'shared/views/view';

import styles from './score-record-view.scss';

export class ScoreRecordView extends View {
  public constructor(private readonly user: IUser) {
    super({ classNames: [styles.record] });
    this.init();
  }

  private init(): void {
    const card = new View({ classNames: [styles.card] });
    card.render([this.initFront(), this.initBack()]);
    this.render(card);
  }

  private initFront(): View {
    const front = new View({ classNames: [styles.side, styles.front] });
    const avatar = new View({ classNames: [styles.avatar] });
    const name = new View({ classNames: [styles.user, styles.name] });
    const mail = new View({ classNames: [styles.user, styles.mail] });
    const scoreView = new View({ classNames: [styles.score] });
    this.initAvatar(avatar);
    const { firstName, lastName, email, score } = this.user;
    this.element.title = `${firstName}\n${lastName}`;
    name.setText(`${firstName} ${lastName}`);
    mail.setText(email);
    scoreView.setText(String(score));
    front.render([avatar, name, mail, scoreView]);
    return front;
  }

  private initBack(): View {
    const datetime = this.user.datetime?.toLocaleString() || 'unknown';
    const cardsField = this.user.cardsField || 'unknown';
    const { hours, min, sec } = timeDiffFormat(this.user.time || 0);
    const back = new View(`<div class="${styles.side} ${styles.back}">
      <div class="${styles.title}">Record date:</div>
      <div class="${styles.datetime}">${datetime}</div>
      <div class="${styles.title}">Cards field:</div>
      <div class="${styles.cardsField}">${cardsField}</div>
      <div class="${styles.title}">Game win time:</div>
      <div class="${styles.time}">${hours}:${min}:${sec}</div>
    </div>`);
    return back;
  }

  private initAvatar(avatar: View): void {
    renderAvatar(
      this.user,
      avatar,
      [styles.svgIcon, styles.avatarImg],
      [styles.avatarImg]
    );
  }

  public getUser(): IUser {
    return this.user;
  }

  public highlight(force = true): void {
    this.setCssState(styles.highlight, force);
  }
}
