// https://docs.google.com/spreadsheets/d/1friRvR7djdTnfTVDhpeTcMEDiD-RIwxHO_V8wcGe65o/edit#gid=0&range=A38:B39
// Юзер считается уникальным если у него уникалны имя, фамилия и email.
// Можете использовать hash фнкцию для высчитываения уникального хеша объекта и устанавливать хеш как id

import { APP_GAME_SETTINGS } from 'app/configs/game.config';
import { randomFromInterval } from 'shared/numbers-utils';
import { hashCode } from 'shared/string-utils';

import { asyncRequest, IndexDbService } from './index-db';

const DB_NAME = 'fronte-finem';
const DB_VERSION = 1;
const DB_USERS_STORE = 'users';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  score: number;
  avatar?: string;
  time?: number;
  cardsField?: string;
  datetime?: Date;
}

export interface IUserService {
  currentUser?: IUser;
  save(user: IUser): Promise<IUser | undefined>;
  updateUserAchievement(
    score: number,
    time: number,
    cardsField: string
  ): Promise<boolean>;
  getFirstByScore(limit: number): Promise<IUser[]>;
  logAll(): Promise<boolean>;
}

export function userHashCode({ firstName, lastName, email }: IUser): number {
  return hashCode(JSON.stringify({ firstName, lastName, email }));
}

export function createTestUser(index: number): IUser {
  const i = randomFromInterval(0, APP_GAME_SETTINGS.cardsField.length - 1);
  return {
    firstName: 'TEST-LONG-USER-NAME-1337-ಠ_ಠ',
    lastName: `0x${index
      .toString(16)
      .padStart(4, '0')}-CAFE-DEAD-BEEF-BABE-FEED`,
    email: `test.user${index}@${index}resu.tset`,
    score: index / 10,
    time: Math.abs(5000 - index * 40),
    cardsField: APP_GAME_SETTINGS.cardsField[i].toString(),
    datetime: new Date(),
  };
}

async function addTestUsers(store: IDBObjectStore, amount = 100) {
  const tasks: Promise<IDBValidKey>[] = Array.from(
    { length: amount },
    (_, i) => {
      const user = createTestUser(i);
      const key = userHashCode(user);
      const request = store.add(user, key);
      return asyncRequest(request);
    }
  );
  await Promise.all(tasks);
}

function createStore(db: IDBDatabase): IDBObjectStore {
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

export class UserService implements IUserService {
  private dbService = new IndexDbService(DB_NAME, DB_VERSION);

  private user?: IUser;

  public get currentUser(): IUser | undefined {
    return this.user;
  }

  public async init(testUser = false): Promise<void> {
    const { db, upgradeMode } = await this.dbService.open();
    if (upgradeMode) {
      const store = createStore(db);
      await addTestUsers(store);
    }
    if (testUser) {
      this.user = createTestUser(Math.floor(window.Math.random() * 100));
    }
  }

  public async save(user: IUser): Promise<IUser | undefined> {
    const key = userHashCode(user);
    try {
      const maybeUser = await this.dbService.read<IUser>(DB_USERS_STORE, key);
      if (maybeUser) {
        if (user.avatar) {
          maybeUser.avatar = user.avatar;
          await this.dbService.update<IUser>(DB_USERS_STORE, maybeUser, key);
        }
        this.user = maybeUser;
        return maybeUser;
      }
      await this.dbService.create<IUser>(DB_USERS_STORE, user, key);
      this.user = user;
      return user;
    } catch (error) {
      // console.log(error);
      return undefined;
    }
  }

  public async updateUserAchievement(
    score: number,
    time: number,
    cardsField: string
  ): Promise<boolean> {
    if (!this.user) return false;
    if (score < this.user.score) return false;
    this.user.score = score;
    this.user.time = time;
    this.user.cardsField = cardsField;
    this.user.datetime = new Date();
    const key = userHashCode(this.user);
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
