import { SCORE_LIMIT } from 'app/configs/score.config';
import { ScoreRecordView } from 'components/score-record/score-record-view';
import { IUserService, userHashCode } from 'services/user-service';
import { View } from 'shared/views/view';

import { BasePage } from '../base-page';

import styles from './score.scss';

export class PageScore extends BasePage {
  public constructor(private readonly userService: IUserService) {
    super({ classNames: [styles.pageScore] });
  }

  public stop(): void {
    this.view.clear();
  }

  public async init(): Promise<void> {
    const users = await this.userService.getFirstByScore(SCORE_LIMIT);
    const records = users.map((user) => new ScoreRecordView(user));
    const { currentUser } = this.userService;
    if (currentUser) {
      const hash = userHashCode(currentUser);
      const checkUser = (rec: ScoreRecordView) =>
        hash === userHashCode(rec.getUser());
      const maybeUser = records.filter(checkUser);
      if (maybeUser.length > 0) maybeUser[0].highlight();
    }
    this.initRows(records);
  }

  private initRows(records: ScoreRecordView[]): void {
    const wrapper = new View({ classNames: [styles.users] });
    const set1 = new View({ classNames: [styles.set, styles.set1] });
    const set2 = new View({ classNames: [styles.set, styles.set2] });
    const set3 = new View({ classNames: [styles.set, styles.set3] });
    const set4 = new View({ classNames: [styles.set, styles.set4] });
    set1.render(records.slice(0, 1));
    set2.render(records.slice(1, 3));
    set3.render(records.slice(3, 6));
    set4.render(records.slice(6, 10));
    wrapper.render([set1, set2, set3, set4]);
    this.view.render(wrapper);
  }
}
