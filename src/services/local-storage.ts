import { ISerializer } from '../shared/models/types';

export class LocalStorageService<Settings> {
  constructor(
    private readonly storageKey: string,
    private readonly initialSettings: Settings,
    private readonly serializer: ISerializer<Settings>
  ) {}

  loadSettings(): Settings {
    const json = window.localStorage.getItem(this.storageKey);
    const settings = json
      ? this.serializer.deserialize(json)
      : this.initialSettings;
    return settings;
  }

  saveSettings(settings: Settings): void {
    window.localStorage.setItem(
      this.storageKey,
      this.serializer.serialize(settings)
    );
  }
}
