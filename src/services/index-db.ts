const errorOpenDB = () =>
  new Error(
    "⚠️ Can't open DB. Probably browser user didn't allow this web app to use IndexedDB? ⚠️"
  );
const errorDB = () => new Error('⚠️ Database not opened, created, linked ⚠️');

interface IErrorInfo {
  operation: string;
  storeName: string;
  key?: IDBValidKey | IDBKeyRange;
}

export interface IDBOpenResult {
  db: IDBDatabase;
  upgradeMode: boolean;
}

export function asyncRequest<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export class IndexDbService {
  private db?: IDBDatabase;

  public constructor(private dbName: string, private dbVersion = 1) {}

  public open(version = 1): Promise<IDBOpenResult> {
    this.dbVersion = version;
    const request = window.indexedDB.open(this.dbName, this.dbVersion);
    return new Promise((resolve, reject) => {
      request.onupgradeneeded = () =>
        this.onOpen(request.result, resolve, true);

      request.onsuccess = () => this.onOpen(request.result, resolve, false);

      request.onerror = () => reject(errorOpenDB());
    });
  }

  private onOpen<T>(
    db: IDBDatabase,
    resolve: (db: IDBOpenResult) => T,
    upgradeMode = false
  ): void {
    this.db = db;
    resolve({ db, upgradeMode });
  }

  public openTransaction(
    storeName: string,
    mode?: IDBTransactionMode
  ): IDBTransaction {
    if (!this.db) throw errorDB();
    return this.db.transaction(storeName, mode);
  }

  public openStore(
    storeName: string,
    mode?: IDBTransactionMode
  ): IDBObjectStore {
    if (!this.db) throw errorDB();
    const transaction = this.db.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  private operate<T>(
    storeName: string,
    operation: (store: IDBObjectStore) => IDBRequest<T>,
    errorInfo: IErrorInfo,
    mode?: IDBTransactionMode
  ): Promise<T> {
    const store = this.openStore(storeName, mode);
    const request = operation(store);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(this.errorGenerator(errorInfo));
    });
  }

  public create<T>(
    storeName: string,
    data: T,
    key?: IDBValidKey
  ): Promise<IDBValidKey> {
    return this.operate(
      storeName,
      (store) => store.add(data, key),
      {
        operation: 'Create',
        key,
        storeName,
      },
      'readwrite'
    );
  }

  public read<T>(
    storeName: string,
    key: IDBValidKey | IDBKeyRange
  ): Promise<T | undefined> {
    return this.operate(
      storeName,
      (store) => store.get(key) as IDBRequest<T>,
      {
        operation: 'Read',
        key,
        storeName,
      },
      'readonly'
    );
  }

  public update<T>(
    storeName: string,
    data: T,
    key?: IDBValidKey
  ): Promise<IDBValidKey> {
    return this.operate(
      storeName,
      (store) => store.put(data, key),
      {
        operation: 'Update',
        key,
        storeName,
      },
      'readwrite'
    );
  }

  public delete(
    storeName: string,
    key: IDBValidKey | IDBKeyRange
  ): Promise<void> {
    return this.operate(
      storeName,
      (store) => store.delete(key),
      {
        operation: 'Delete',
        key,
        storeName,
      },
      'readwrite'
    );
  }

  private errorGenerator({ operation, storeName, key }: IErrorInfo): Error {
    return new Error(
      `⚠️DB::${this.dbName}.${
        this.dbVersion
      }: <${operation}> on store "${storeName}" failed for key "${String(
        key
      )}" ⚠️`
    );
  }
}
