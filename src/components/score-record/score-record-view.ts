import { IUser } from 'services/user-service';
import { timeDiffFormat } from 'shared/date-time-utils';
import { renderAvatar } from 'shared/views/avatar-factory';
import { ICreateViewOptions, View } from 'shared/views/view';

import styles from './score-record-view.scss';

export class ScoreRecordView extends View {
  private avatar = new View({ classNames: [styles.avatar] });

  private userView = new View({ classNames: [styles.user] });

  private name = new View({ classNames: [styles.userName] });

  private mail = new View({ classNames: [styles.userMail] });

  private score = new View({ classNames: [styles.score] });

  private time = new View({ classNames: [styles.time] });

  public constructor(
    private readonly user: IUser,
    { classNames = [], ...options }: ICreateViewOptions
  ) {
    super({ classNames: [...classNames, styles.scoreRecord], ...options });
    this.init();
  }

  private init(): void {
    renderAvatar(
      this.user,
      this.avatar,
      [styles.svgIcon, styles.avatarImg],
      [styles.avatarImg]
    );
    this.userView.render([this.name, this.mail]);
    this.render([this.avatar, this.userView, this.score, this.time]);

    this.name.setText(`${this.user.firstName} ${this.user.lastName}`);
    this.mail.setText(this.user.email);
    this.score.setText(String(this.user.score));
    const timeDiff = timeDiffFormat(this.user.time);
    this.time.setText(`${timeDiff.hours}:${timeDiff.min}:${timeDiff.sec}`);
  }

  public getUser(): IUser {
    return this.user;
  }

  public highlight(force = true): void {
    this.setCssState(styles.scoreRecordHighlight, force);
  }
}
