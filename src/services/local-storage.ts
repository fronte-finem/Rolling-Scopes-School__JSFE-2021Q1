export class LocalStorageService<Settings> {
  constructor(private readonly storageKey: string, private readonly initialSettings: Settings) {}

  loadSettings(): Promise<Settings> {
    return new Promise((resolve) => {
      const result = window.localStorage.getItem(this.storageKey);
      if (result === null) {
        resolve(this.initialSettings);
      } else {
        resolve(JSON.parse(result) as Settings);
      }
    });
  }

  saveSettings(settings: Settings): Promise<void> {
    return new Promise((resolve) => {
      window.localStorage.setItem(
        this.storageKey,
        JSON.stringify(settings)
      );
      resolve();
    });
  }
}
