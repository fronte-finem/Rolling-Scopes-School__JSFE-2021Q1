import { IUser, IUserService, UserService } from '../../services/user-service';
import { timeDiffFormat } from '../../shared/date-time-utils';
import { renderAvatar } from '../../shared/views/avatar-factory';
import { View } from '../../shared/views/view';
import { BasePage } from '../base-page';

import styles from './score.scss';

const TITLE_PLAYERS = 'Best players';
const TITLE_SCORE = 'Score';
const TITLE_TIME = 'Time';
// На странице Best score должен отображаться топ 10 игроков.
const SCORE_LIMIT = 10;

export class PageScore extends BasePage {
  private readonly records = new View({
    tag: 'ul',
    classNames: [styles.users],
  });

  public constructor(private readonly userService: IUserService) {
    super({ classNames: [styles.pageScore] });
  }

  public stop(): void {
    this.view.clear();
  }

  public async init(): Promise<void> {
    const users = await this.userService.getFirstByScore(SCORE_LIMIT);
    const { currentUser } = this.userService;
    let checkUsers: (u: IUser) => boolean;
    if (currentUser) {
      const hash = UserService.userHashCode(currentUser);
      checkUsers = (u) => hash === UserService.userHashCode(u);
    } else {
      checkUsers = () => false;
    }
    const items = users.map((user) => PageScore.createRecord(user, checkUsers));
    this.view.render([PageScore.initTitle(), this.records.render(items)]);
  }

  private static initTitle(): View<HTMLElement> {
    return new View({
      classNames: [styles.title, styles.row],
      childs: (
        [
          [TITLE_PLAYERS, [styles.cell1, styles.titleUsers]],
          [TITLE_SCORE, [styles.cell2, styles.titleScore]],
          [TITLE_TIME, [styles.cell3, styles.titleTime]],
        ] as [string, string[]][]
      ).map((opts) => PageScore.createTitle(...opts)),
    });
  }

  private static createTitle(
    text: string,
    classNames: string[]
  ): View<HTMLElement> {
    return new View({
      tag: 'h2',
      classNames: [styles.titlePart, ...classNames],
      text,
    });
  }

  private static createRecord(
    user: IUser,
    checkUsers: (u: IUser) => boolean
  ): View<HTMLLIElement> {
    const itemClassNames = [styles.item, styles.row];
    if (checkUsers(user)) itemClassNames.push(styles.itemCurrentUser);
    const li = new View<HTMLLIElement>({
      tag: 'li',
      classNames: itemClassNames,
    });

    const avatar = new View({ classNames: [styles.avatar] });
    renderAvatar(
      user,
      avatar,
      [styles.svgIcon, styles.avatarImg],
      [styles.avatarImg]
    );

    const name = new View({
      classNames: [styles.userName],
      text: `${user.firstName} ${user.lastName}`,
    });
    const mail = new View({
      classNames: [styles.userMail],
      text: `${user.email}`,
    });
    const full = new View({ classNames: [styles.cell1, styles.user] });

    const score = new View({
      classNames: [styles.cell2, styles.score],
      text: `${user.score}`,
    });

    const time = timeDiffFormat(user.time);
    const timeView = new View({
      classNames: [styles.cell3, styles.time],
      text: `${time.hours}:${time.min}:${time.sec}`,
    });

    li.render([avatar, full.render([name, mail]), score, timeView]);
    return li;
  }
}
