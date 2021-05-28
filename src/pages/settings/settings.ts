import { APP_GAME_SETTINGS } from '../../app/configs/game.config';
import { InputRangeView } from '../../components/range-input/range-input-view';
import { SelectView } from '../../components/select/select-view';
import { CardImagesCategory } from '../../services/card-images-urls';
import { IGameSettingsService } from '../../services/game-settings';
import { View } from '../../shared/views/view';
import { BasePage } from '../base-page';

import { GameSettingsModel, IGameSettingsState } from './settings-model';

import styles from './settings.scss';

export class PageSettings extends BasePage {
  private model = new GameSettingsModel();

  private gameCardsSelector = new SelectView<CardImagesCategory>({
    ...APP_GAME_SETTINGS.cardImagesCategory,
    classNames: [styles.selector],
  });

  private cardsRange = new InputRangeView({
    ...APP_GAME_SETTINGS.cardsField,
    classNames: [styles.range],
  });

  private initialShowTimeRange = new InputRangeView({
    ...APP_GAME_SETTINGS.initialShowTime,
    classNames: [styles.range],
  });

  private mismatchShowTimeRange = new InputRangeView({
    ...APP_GAME_SETTINGS.mismatchShowTime,
    classNames: [styles.range],
  });

  private wrapper = new View({ classNames: [styles.settingsWrapper] });

  public constructor(private gameSettingsService: IGameSettingsService) {
    super({ classNames: [styles.settings] });
  }

  public stop(): void {
    this.view.clear();
  }

  public init(): void {
    this.view.render(this.wrapper);
    this.wrapper.render([
      this.gameCardsSelector,
      this.cardsRange,
      this.initialShowTimeRange,
      this.mismatchShowTimeRange,
    ]);

    const initialSettings = this.gameSettingsService.load();
    this.model.init(initialSettings as IGameSettingsState);
    this.model.onStateChange((settings) =>
      this.gameSettingsService.save(settings)
    );
    this.initControls(this.model.getState());
  }

  private initControls(state: IGameSettingsState): void {
    this.gameCardsSelector.setValue(state.cardImagesCategory);
    this.cardsRange.setValue(state.cardsField);
    this.initialShowTimeRange.setValue(state.initialShowTime);
    this.mismatchShowTimeRange.setValue(state.mismatchShowTime);

    this.gameCardsSelector.onSelect((value) => {
      this.model.state.cardImagesCategory = value;
    });
    this.cardsRange.onSelect((value) => {
      this.model.state.cardsField = value;
    });
    this.initialShowTimeRange.onSelect((value) => {
      this.model.state.initialShowTime = value;
    });
    this.mismatchShowTimeRange.onSelect((value) => {
      this.model.state.mismatchShowTime = value;
    });
  }
}
