import { Card } from 'components/card/card';
import { CardModel } from 'components/card/card-model';
import { CardFieldModel } from 'components/cards-field/card-field-model';
import { CardsField } from 'components/cards-field/cards-field';
import { NavMenuView } from 'components/nav-menu/nav-menu-view';
import { PopUpSignUpView } from 'components/pop-up-sign-up/pop-up-sign-up-view';
import { PageError } from 'pages/error/error';
import { DummyUserService } from 'services/dummy-user-service';
import { randomFromInterval } from 'shared/numbers-utils';
import { View } from 'shared/views/view';

import { ROUTE, SVGICON, TITLE } from './routes.config';
import { cardImagesService, gameSettingsService } from './services.config';

import styles from '~pages/about/about.scss';

export const PAGE_ABOUT = {
  title: {
    tag: 'h2' as keyof HTMLElementTagNameMap,
    text: 'How to play?',
    classNames: [styles.title],
  },
  step1: {
    text: 'Register new player in game',
    userService: new DummyUserService(),
  },
  step2: { text: 'Configure your game settings' },
  step3: {
    cardFieldModel: new CardFieldModel(2, 3),
    text: 'Start you new game! Remember card positions and match it before times up.',
    gameSettingsService,
    cardImagesService,
  },
};

const createInfo = (text: string, className: string[] = []) => {
  const info = new View({
    classNames: [styles.info, styles.cell, ...className],
  });
  const textView = new View({ classNames: [styles.text], text });
  info.render(textView);
  return info;
};

const createPict = (content: View, className: string[] = []) => {
  const pict = new View({
    classNames: [styles.pict, styles.cell, ...className],
  });
  pict.render(content);
  return pict;
};

export const createStep1 = (): View[] => {
  const popup = new PopUpSignUpView(PAGE_ABOUT.step1.userService);
  void popup.show();
  return [
    createInfo(PAGE_ABOUT.step1.text, [styles.infoStep1]),
    createPict(popup, [styles.pictStep1]),
  ];
};

export const createStep2 = (): View[] => {
  const nav = new NavMenuView();
  nav.init([
    {
      route: {
        url: ROUTE.SETTINGS,
        title: TITLE.SETTINGS,
        pageCreator: () => new PageError(),
      },
      navSvgIcon: SVGICON.SETTINGS,
    },
  ]);
  nav.setActiveNavLink(ROUTE.SETTINGS);
  return [
    createInfo(PAGE_ABOUT.step2.text, [styles.infoStep2]),
    createPict(nav, [styles.pictStep2]),
  ];
};

export const createStep3 = async (): Promise<View[]> => {
  const cardsField = new CardsField();
  const settings = PAGE_ABOUT.step3.gameSettingsService.load();
  const urls = await PAGE_ABOUT.step3.cardImagesService.getUrls(
    settings.cardImagesCategory,
    PAGE_ABOUT.step3.cardFieldModel.getCardsAmount()
  );
  if (!urls) throw new Error('Cards images urls generation failed');
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
