import { createTestUser, IUser, IUserService } from 'services/user-service';

export class DummyUserService implements IUserService {
  private user = createTestUser(999);

  public get currentUser(): IUser | undefined {
    return this.user;
  }

  public save(user: IUser): Promise<IUser | undefined> {
    this.user = user;
    return Promise.resolve(user);
  }

  public updateUserAchievement(
    score: number,
    time: number,
    cardsField: string
  ): Promise<boolean> {
    this.user.score = score;
    this.user.time = time;
    this.user.cardsField = cardsField;
    this.user.datetime = new Date();
    return Promise.resolve(true);
  }

  public getFirstByScore(limit = 5): Promise<IUser[]> {
    return Promise.resolve(Array<IUser>(limit).fill(this.user));
  }

  public logAll(): Promise<boolean> {
    return Promise.resolve(!!this.user);
  }
}
