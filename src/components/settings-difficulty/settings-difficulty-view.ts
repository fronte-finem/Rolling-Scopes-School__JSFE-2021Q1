import { SETTINGS_DIFFICULTY } from 'app/configs/settings-difficulty.config';
import { InputRangeView } from 'components/range-input/range-input-view';
import { GameSettingsModel } from 'pages/settings/settings-model';
import { calcModifier } from 'services/game-logic';
import { View } from 'shared/views/view';

import styles from './settings-difficulty-view.scss';

export class SettingsDifficultyView extends View {
  private cardsRange = new InputRangeView(SETTINGS_DIFFICULTY.cardsRange);

  private initialShowTimeRange = new InputRangeView(
    SETTINGS_DIFFICULTY.initialShowTimeRange
  );

  private mismatchShowTimeRange = new InputRangeView(
    SETTINGS_DIFFICULTY.mismatchShowTimeRange
  );

  private scoreModifier = new View(SETTINGS_DIFFICULTY.scoreModifier);

  public constructor() {
    super({ classNames: [styles.difficulty] });
    this.init();
  }

  private init(): void {
    const title = new View(SETTINGS_DIFFICULTY.title);
    const wrapper = new View({ classNames: [styles.wrapper] });
    wrapper.render([this.initInputs(), this.initOutputs()]);
    this.render([title, wrapper]);
  }

  private initInputs(): View {
    const wrapper = new View({ classNames: [styles.inputs] });
    wrapper.render([
      this.cardsRange,
      this.initialShowTimeRange,
      this.mismatchShowTimeRange,
    ]);
    return wrapper;
  }

  private initOutputs(): View {
    const wrapper = new View({ classNames: [styles.outputs] });
    const title = new View(SETTINGS_DIFFICULTY.scoreTitle);
    wrapper.render([title, this.scoreModifier]);
    return wrapper;
  }

  public initControls(model: GameSettingsModel): void {
    const state = model.getState();
    this.cardsRange.setValue(state.cardsField);
    this.initialShowTimeRange.setValue(state.initialShowTime);
    this.mismatchShowTimeRange.setValue(state.mismatchShowTime);
    this.scoreModifier.setText(calcModifier(state).toFixed(2));

    this.cardsRange.onSelect((value) => {
      model.state.cardsField = value;
      this.scoreModifier.setText(calcModifier(model.state).toFixed(2));
    });
    this.initialShowTimeRange.onSelect((value) => {
      model.state.initialShowTime = value;
      this.scoreModifier.setText(calcModifier(model.state).toFixed(2));
    });
    this.mismatchShowTimeRange.onSelect((value) => {
      model.state.mismatchShowTime = value;
      this.scoreModifier.setText(calcModifier(model.state).toFixed(2));
    });
  }
}
