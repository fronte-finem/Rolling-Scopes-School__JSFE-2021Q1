import { PAGE_ABOUT } from 'app/configs/page-about.config';
import { Card } from 'components/card/card';
import { CardModel } from 'components/card/card-model';
import { CardsField } from 'components/cards-field/cards-field';
import { randomFromInterval } from 'shared/numbers-utils';
import { View } from 'shared/views/view';

import { createInfo, createPict } from './builder';

import styles from './about.scss';

const URLS_ERROR = 'Cards images urls generation failed';

export const createStep3 = async (): Promise<View[]> => {
  const cardsField = new CardsField();
  const settings = PAGE_ABOUT.step3.gameSettingsService.load();
  const urls = await PAGE_ABOUT.step3.cardImagesService.getUrls(
    settings.cardImagesCategory,
    PAGE_ABOUT.step3.cardFieldModel.getCardsAmount()
  );
  if (!urls) throw new Error(URLS_ERROR);
  const cardModels = urls.front.map(
    (url, id) => new CardModel(id, url, urls.back, settings.mismatchShowTime)
  );
  const cards = cardModels.map((model) => new Card(model));
  matchRandom(cardModels);
  cardsField.render(cards, PAGE_ABOUT.step3.cardFieldModel);
  return [
    createInfo(PAGE_ABOUT.step3.text, [styles.infoStep3]),
    createPict(cardsField.view, [styles.pictStep3]),
  ];
};

function matchRandom(cardModels: CardModel[]) {
  const card = cardModels[randomFromInterval(0, cardModels.length - 1)];
  cardModels
    .filter((c) => c.frontImage === card.frontImage)
    .forEach((c) => {
      c.flip(true);
      c.match(true);
    });
}
