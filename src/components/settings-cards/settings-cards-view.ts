import { SETTINGS_CARDS } from 'app/configs/settings-cards.config';
import { CardModel } from 'components/card/card-model';
import { CardView } from 'components/card/card-view';
import { SelectView } from 'components/select/select-view';
import { GameSettingsModel } from 'pages/settings/settings-model';
import { CardImagesCategory } from 'services/card-images-urls';
import { View } from 'shared/views/view';

import styles from './settings-cards-view.scss';

export class SettingsCardsView extends View {
  private cards = new Map<CardImagesCategory, CardView>(
    [...SETTINGS_CARDS.selector.entries()].map(([key, model]) => [
      key,
      new CardView(model),
    ])
  );

  private activeCard?: CardView;

  public constructor() {
    super({ classNames: [styles.cards] });
    const title = new View(SETTINGS_CARDS.title);
    this.render([title, this.initSelector()]);
  }

  private initSelector(): View {
    const wrapper = new View({ classNames: [styles.wrapper] });
    wrapper.render([...this.cards.values()]);
    return wrapper;
  }

  public initControls(model: GameSettingsModel): void {
    const state = model.getState();
    this.activeCard = this.cards.get(state.cardImagesCategory);
    this.activeCard?.match(true);
    void this.activeCard?.flip(true);

    [...this.cards.entries()].forEach(([key, card]) =>
      card.onClick(async () => {
        if (card === this.activeCard) return;
        this.activeCard?.match(false);
        this.activeCard?.error(true);
        await this.activeCard?.flip(false);
        this.activeCard?.error(false);
        this.activeCard = card;
        this.activeCard.match(true);
        void this.activeCard.flip(true);
        model.state.cardImagesCategory = key;
      })
    );
  }
}
