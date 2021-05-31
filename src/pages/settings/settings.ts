import { SettingsCardsView } from 'components/settings-cards/settings-cards-view';
import { SettingsDifficultyView } from 'components/settings-difficulty/settings-difficulty-view';
import { IGameSettingsService } from 'services/game-settings';
import { View } from 'shared/views/view';

import { BasePage } from '../base-page';

import { GameSettingsModel } from './settings-model';

import styles from './settings.scss';

export class PageSettings extends BasePage {
  private model = new GameSettingsModel();

  private settingsCards = new SettingsCardsView();

  private settingsDifficulty = new SettingsDifficultyView();

  public constructor(private gameSettingsService: IGameSettingsService) {
    super({ classNames: [styles.settings] });
  }

  public stop(): void {
    this.view.clear();
  }

  public init(): void {
    const wrapper = new View({ classNames: [styles.settingsWrapper] });
    this.view.render(wrapper);
    wrapper.render([this.initSettingsCards(), this.initDifficultyCustomizer()]);
    this.initModel();
  }

  private initModel() {
    const initialSettings = this.gameSettingsService.load();
    this.model.init({ ...initialSettings });
    this.model.onStateChange((settings) =>
      this.gameSettingsService.save(settings)
    );
    this.initControls();
  }

  private initSettingsCards() {
    const wrapper = new View({ classNames: [styles.cell, styles.cell1] });
    wrapper.render(this.settingsCards);
    return wrapper;
  }

  private initDifficultyCustomizer() {
    const wrapper = new View({ classNames: [styles.cell, styles.cell2] });
    wrapper.render(this.settingsDifficulty);
    return wrapper;
  }

  private initControls(): void {
    this.settingsCards.initControls(this.model);
    this.settingsDifficulty.initControls(this.model);
  }
}
