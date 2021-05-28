import { SCORE_LIMIT, ScoreTitle } from 'app/configs/score.config';
import { ScoreRecordView } from 'components/score-record/score-record-view';

import { IUser, IUserService, UserService } from '../../services/user-service';
import { View } from '../../shared/views/view';
import { BasePage } from '../base-page';

import styles from './score.scss';

const createTitle = (text: string, classNames: string[]) =>
  new View({ tag: 'h2', classNames, text });

export class PageScore extends BasePage {
  private title = new View({ classNames: [styles.title, styles.row] });

  private titleCell1 = createTitle(ScoreTitle.PLAYERS, [styles.titleUsers]);

  private titleCell2 = createTitle(ScoreTitle.SCORE, [styles.titleScore]);

  private titleCell3 = createTitle(ScoreTitle.TIME, [styles.titleTime]);

  private usersView = new View({ tag: 'ul', classNames: [styles.users] });

  private recordsViews!: Array<ScoreRecordView>;

  public constructor(private readonly userService: IUserService) {
    super({ classNames: [styles.pageScore] });
  }

  public stop(): void {
    this.view.clear();
  }

  public async init(): Promise<void> {
    const users = await this.userService.getFirstByScore(SCORE_LIMIT);
    this.title.render([this.titleCell1, this.titleCell2, this.titleCell3]);
    this.view.render([this.title, this.usersView]);
    this.initRows(users);
  }

  private initRows(users: IUser[]): void {
    this.recordsViews = users.map(
      (user) =>
        new ScoreRecordView(user, { tag: 'li', classNames: [styles.row] })
    );
    const { currentUser } = this.userService;
    if (currentUser) {
      const hash = UserService.userHashCode(currentUser);
      this.recordsViews
        .filter((rec) => hash === UserService.userHashCode(rec.getUser()))?.[0]
        .highlight();
    }
    this.usersView.render(this.recordsViews);
  }
}
