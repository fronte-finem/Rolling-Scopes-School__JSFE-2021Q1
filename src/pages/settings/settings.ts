import { APP_GAME_DIFFICILTY_CONFIG as APP_GAME_DIFFICULTY_CONFIG } from '../../app/app.game.config';
import { CardImagesCategory } from '../../services/card-images-urls';
import { IGameSettingsService } from '../../services/game-settings';
import { View } from '../../shared/views/view';
import { SelectView } from '../../components/select/select-view';
import { BasePage } from '../base-page';
import { GameSettingsModel, IGameSettingsState } from './settings-model';
import { CardsAmount } from '../game/game-types';
import styles from './settings.scss';

export class PageSettings extends BasePage {
  private model?: GameSettingsModel;

  selectGameCards: SelectView = new SelectView({
    heading: 'game cards',
    placeholder: 'select game cards type',
    classNames: [styles.settingsSelect],
  });

  selectDifficulty: SelectView = new SelectView({
    heading: 'difficulty',
    placeholder: '🎴 cards \xa0|\xa0 ⏱ start |\xa0 🏆 score',
    classNames: [styles.settingsSelect],
  });

  constructor(private gameSettingsService: IGameSettingsService) {
    super({ classNames: [styles.settings] });
  }

  stop(): void {
    this.view.clear();
  }

  async init(): Promise<void> {
    this.view.render(
      new View({
        classNames: [styles.settingsWrapper],
        childs: [this.selectDifficulty, this.selectGameCards],
      })
    );

    const initialSettings = await this.gameSettingsService.loadSettings();

    this.model = new GameSettingsModel(initialSettings);
    this.model.onStateChange((settings) =>
      this.gameSettingsService.saveSettings(settings)
    );
    this.initSelectsors(this.model.getState());
  }

  private initSelectsors(state: IGameSettingsState): void {
    this.selectGameCards.addOptions(PageSettings.prepareCategoryOptions(state));

    this.selectDifficulty.addOptions(
      PageSettings.prepareDifficultyOptions(state)
    );

    this.selectGameCards.onSelect((value) =>
      this.model?.setSetting('cardImagesCategory', value as CardImagesCategory)
    );

    this.selectDifficulty.onSelect((value) =>
      this.model?.setSetting('cardsAmount', value as unknown as CardsAmount)
    );
  }

  private static prepareCategoryOptions(state: IGameSettingsState) {
    return Object.entries(CardImagesCategory).map((entry) => ({
      value: entry[0],
      text: String(entry[1]),
      selected: state.cardImagesCategory === entry[0],
    }));
  }

  private static prepareDifficultyOptions(state: IGameSettingsState) {
    return Object.entries(APP_GAME_DIFFICULTY_CONFIG).map((entry) => {
      const cards = `${entry[1].cardField[0]} × ${entry[1].cardField[1]}`;
      const time = String(entry[1].initialShowTime).padStart(2, '\xa0');
      const score = Math.floor(100 * entry[1].scoreCoefficient);
      return {
        value: entry[0],
        text: `🎴 ${cards} \xa0|\xa0 ⏱\xa0 ${time}s \xa0|\xa0 🏆 × ${score}%`,
        selected: state.cardsAmount.toString() === entry[0],
        title: `cards ${cards} \xa0|\xa0 start time ${time}s \xa0|\xa0 score × ${score}%`,
      };
    });
  }
}

// На странице Settings должны находится настройки приложения. Допускаются любые настройки, но две базовые нельзя игнорировать:
//   Настройка сложности игры (4х4, 6х6, 8х8)
//   Настройка типов карточек для сравнений (можно использовать любые типы. Пример: Животные, автомобили и т.п.)
