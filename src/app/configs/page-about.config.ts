import { CardFieldModel } from 'components/cards-field/card-field-model';
import { DummyUserService } from 'services/dummy-user-service';

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
