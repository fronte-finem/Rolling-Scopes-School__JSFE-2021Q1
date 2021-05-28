// https://docs.google.com/spreadsheets/d/1friRvR7djdTnfTVDhpeTcMEDiD-RIwxHO_V8wcGe65o/edit#gid=0&range=A38:B39
// Юзер считается уникальным если у него уникалны имя, фамилия и email.
// Можете использовать hash фнкцию для высчитываения уникального хеша объекта и устанавливать хеш как id

import { hashCode } from '../shared/string-utils';

import { IndexDbService } from './index-db';

const DB_NAME = 'fronte-finem';
const DB_VERSION = 1;
const DB_USERS_STORE = 'users';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  score: number;
  time: number;
  avatar?: string;
}

export interface IUserService {
  currentUser?: IUser;
  save(user: IUser): Promise<IUser | undefined>;
  updateUserAchievement(score: number, time: number): Promise<boolean>;
  getFirstByScore(limit: number): Promise<IUser[]>;
  logAll(): Promise<boolean>;
}

export class UserService implements IUserService {
  private dbService = new IndexDbService(DB_NAME, DB_VERSION);

  private user?: IUser;

  public get currentUser(): IUser | undefined {
    return this.user;
  }

  public async init(testUser = false): Promise<void> {
    const { db, upgradeMode } = await this.dbService.open();
    if (upgradeMode) {
      const store = UserService.createStore(db);
      await UserService.addTestUsers(store);
    }
    if (testUser) {
      this.user = UserService.createTestUser(
        Math.floor(window.Math.random() * 100)
      );
    }
  }

  private static createStore(db: IDBDatabase) {
    const store = db.createObjectStore(DB_USERS_STORE);
    store.createIndex('firstName', 'firstName', { unique: false });
    store.createIndex('lastName', 'lastName', { unique: false });
    store.createIndex('email', 'email', { unique: false });
    store.createIndex('score', 'score', { unique: false });
    store.createIndex('fullId', ['firstName', 'lastName', 'email'], {
      unique: true,
    });
    return store;
  }

  private static async addTestUsers(store: IDBObjectStore, amount = 100) {
    const tasks: Promise<IDBValidKey>[] = Array.from({ length: amount }).map(
      (_, i) => {
        const user = UserService.createTestUser(i);
        const key = UserService.userHashCode(user);
        const request = store.add(user, key);
        return IndexDbService.asyncRequest(request);
      }
    );
    await Promise.all(tasks);
  }

  public static createTestUser(index: number): IUser {
    return {
      firstName: 'Test',
      lastName: `User${index}`,
      email: `test.user${index}@${index}resu.tset`,
      score: index / 10,
      time: Math.abs(5000 - index * 40),
    };
  }

  public async save(user: IUser): Promise<IUser | undefined> {
    const key = UserService.userHashCode(user);
    const maybeUser = await this.dbService.read<IUser>(DB_USERS_STORE, key);
    if (maybeUser) {
      this.user = maybeUser;
      return maybeUser;
    }
    try {
      await this.dbService.create<IUser>(DB_USERS_STORE, user, key);
    } catch (error) {
      // console.log(error);
      return undefined;
    }
    this.user = user;
    return user;
  }

  public static userHashCode({ firstName, lastName, email }: IUser): number {
    return hashCode(JSON.stringify({ firstName, lastName, email }));
  }

  public async updateUserAchievement(
    score: number,
    time: number
  ): Promise<boolean> {
    if (!this.user) return false;
    if (score < this.user.score) return false;
    this.user.score = score;
    this.user.time = time;
    const key = UserService.userHashCode(this.user);
    try {
      await this.dbService.update<IUser>(DB_USERS_STORE, this.user, key);
    } catch (error) {
      // console.log(error);
      return false;
    }
    return true;
  }

  public async getFirstByScore(limit = 5): Promise<IUser[]> {
    let counter = 0;
    const users: IUser[] = [];
    const transaction = this.dbService.openTransaction(
      DB_USERS_STORE,
      'readonly'
    );
    const store = transaction.objectStore(DB_USERS_STORE);
    const index = store.index('score');
    index.openCursor(null, 'prev').onsuccess = (event: Event) => {
      const request = event.target as IDBRequest<IDBCursorWithValue | null>;
      const cursor = request.result;
      if (cursor && counter < limit) {
        users.push(cursor.value);
        counter += 1;
        cursor.continue();
      }
    };
    return new Promise((resolve) => {
      transaction.oncomplete = () => resolve(users);
    });
  }

  public async logAll(): Promise<boolean> {
    const transaction = this.dbService.openTransaction(
      DB_USERS_STORE,
      'readonly'
    );
    const store = transaction.objectStore(DB_USERS_STORE);
    store.openCursor().onsuccess = (event: Event) => {
      const request = event.target as IDBRequest<IDBCursorWithValue | null>;
      const cursor = request.result;
      // console.log(cursor?.value);
      cursor?.continue();
    };
    return new Promise((resolve) => {
      transaction.oncomplete = () => resolve(true);
    });
  }
}
