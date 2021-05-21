import { APP_GAME_DIFFICILTY_CONFIG } from '../../app/app.game.config';
import { CardImagesCategory } from '../../services/card-images-urls';
import { IGameSettingsService } from '../../services/game-settings';
import { SelectView } from '../../components/select/select-view';
import { Factory } from '../../shared/views/view-factory';
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
    placeholder: 'select game type',
    classNames: [styles.settingsSelect],
  });

  constructor(private gameSettingsService: IGameSettingsService) {
    super({ classNames: [styles.settings] });

    this.view.render(
      Factory.view({
        classNames: [styles.settingsWrapper],
        childs: [this.selectDifficulty, this.selectGameCards],
      })
    );

    this.gameSettingsService.loadSettings().then((initialSettings) => {
      this.model = new GameSettingsModel(initialSettings);
      this.model.onStateChange((settings) =>
        this.gameSettingsService.saveSettings(settings)
      );
      this.initSelectsors(this.model.getState());
    }, null);
  }

  initSelectsors(state: IGameSettingsState): void {
    const catOpts = Object.entries(CardImagesCategory).map((entry) => ({
      value: entry[0],
      text: String(entry[1]),
      selected: state.cardImagesCategory === entry[0],
    }));
    this.selectGameCards.addOptions(catOpts);

    const difOpts = Object.entries(APP_GAME_DIFFICILTY_CONFIG).map((entry) => {
      const cards = `${entry[1].cardField[0]} × ${entry[1].cardField[1]}`;
      const time = String(entry[1].initialShowTime).padStart(2, '\xa0');
      const score = Math.floor(100 * entry[1].scoreCoefficient);
      return {
        value: entry[0],
        text: `🎴 ${cards} \xa0|\xa0 Start ⏳ ${time}s \xa0|\xa0 Score 🏆 × ${score}%`,
        selected: state.cardsAmount.toString() === entry[0],
      };
    });
    this.selectDifficulty.addOptions(difOpts);

    this.selectGameCards.onSelect((value) =>
      this.model?.setSetting(
        'cardImagesCategory',
        value as keyof typeof CardImagesCategory
      )
    );

    this.selectDifficulty.onSelect((value) =>
      this.model?.setSetting('cardsAmount', value as unknown as CardsAmount)
    );
  }
}

// На странице Settings должны находится настройки приложения. Допускаются любые настройки, но две базовые нельзя игнорировать:
//   Настройка сложности игры (4х4, 6х6, 8х8)
//   Настройка типов карточек для сравнений (можно использовать любые типы. Пример: Животные, автомобили и т.п.)
