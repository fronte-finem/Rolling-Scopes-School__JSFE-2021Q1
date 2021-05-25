export class LocalStorageService<Settings> {
  constructor(
    private readonly storageKey: string,
    private readonly initialSettings: Settings
  ) {}

  loadSettings(): Settings {
    const result = window.localStorage.getItem(this.storageKey);
    return result ? (JSON.parse(result) as Settings) : this.initialSettings;
  }

  saveSettings(settings: Settings): void {
    window.localStorage.setItem(this.storageKey, JSON.stringify(settings));
  }
}
