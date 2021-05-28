import {
  APP_GAME_CARD_FIELDS,
  APP_GAME_INITIAL_SHOW_TIME,
  APP_GAME_MISMATCH_SHOW_TIME,
} from '../../app/configs/game.config';
import { CardFieldModel } from '../../components/cards-field/card-field-model';
import {
  ICreateInputRangeOptions,
  InputRangeView,
} from '../../components/range-input/range-input-view';
import { SelectView } from '../../components/select/select-view';
import {
  CARD_IMAGES_CATEGORY_TEXT_MAP,
  CardImagesCategory,
} from '../../services/card-images-urls';
import { IGameSettingsService } from '../../services/game-settings';
import { View } from '../../shared/views/view';
import { BasePage } from '../base-page';

import { GameSettingsModel, IGameSettingsState } from './settings-model';

import styles from './settings.scss';

export class PageSettings extends BasePage {
  private model = new GameSettingsModel();

  private selectGameCards = new SelectView<CardImagesCategory>({
    heading: 'game cards',
    placeholder: 'Select game cards type',
    classNames: [styles.settingsSelect],
  });

  private cardsRange = new InputRangeView({
    title: '🎴🎴 Cards field (rows × columns)',
    values: APP_GAME_CARD_FIELDS,
    classNames: [styles.range],
  } as ICreateInputRangeOptions<CardFieldModel>);

  private initialShowTimeRange = new InputRangeView({
    title: '⏱🃏 Start game countdown (seconds)',
    values: APP_GAME_INITIAL_SHOW_TIME,
    classNames: [styles.range],
  } as ICreateInputRangeOptions<number>);

  private mismatchShowTimeRange = new InputRangeView({
    title: '🍎🍏 Delay flip after mismatch (seconds)',
    values: APP_GAME_MISMATCH_SHOW_TIME,
    classNames: [styles.range],
  } as ICreateInputRangeOptions<number>);

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
      this.selectGameCards,
      this.cardsRange,
      this.initialShowTimeRange,
      this.mismatchShowTimeRange,
    ]);

    const initialSettings = this.gameSettingsService.load();

    this.model.init(initialSettings as IGameSettingsState);
    this.model.onStateChange((settings) =>
      this.gameSettingsService.save(settings)
    );
    this.initSelectsors(this.model.getState());
    this.initRanges(this.model.getState());
  }

  private initRanges(state: IGameSettingsState): void {
    this.cardsRange.setValue(state.cardsField);
    this.initialShowTimeRange.setValue(state.initialShowTime);
    this.mismatchShowTimeRange.setValue(state.mismatchShowTime);

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

  private initSelectsors(state: IGameSettingsState): void {
    this.selectGameCards.addOptions(PageSettings.prepareCategoryOptions(state));
    this.selectGameCards.onSelect((value) => {
      this.model.state.cardImagesCategory = value;
    });
  }

  private static prepareCategoryOptions(state: IGameSettingsState) {
    return Object.values(CardImagesCategory).map((category) => ({
      value: category,
      text: CARD_IMAGES_CATEGORY_TEXT_MAP.get(category) as string,
      selected: state.cardImagesCategory === category,
    }));
  }
}
