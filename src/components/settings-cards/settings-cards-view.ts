import { SETTINGS_CARDS } from 'app/configs/settings-cards.config';
import { CardView } from 'components/card/card-view';
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
        model.state.cardImagesCategory = key;
        this.activeCard?.match(false);
        card.match(true);
        this.activeCard?.error(true);
        await card.flip(true);
        this.activeCard?.error(false);
        this.activeCard?.flip(false);
        this.activeCard = card;
      })
    );
  }
}
