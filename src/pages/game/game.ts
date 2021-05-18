import BasePage from '../base-page';
import Card from '../../components/card/card';
import CardsField from '../../components/cards-field/cards-field';
import style from './game.scss';
import GameModel from './game-model';
import CardModel from '../../components/card/card-model';
import Timer from '../../components/timer/timer';
import { CardImagesCategory, ICardImagesService } from '../../services/card-images-urls';
import { CardFieldTypes } from '../../components/cards-field/card-field-model';

const PAGE_TITLE = 'game';
const SHOW_TIME = 5;

export default class PageGame extends BasePage {
  private readonly timer = new Timer();

  private readonly cardsField = new CardsField();

  private model?: GameModel;

  private cards: Card[] = [];

  constructor(private cardImagesService: ICardImagesService) {
    super(PAGE_TITLE, {
      styles: [style.game],
      stateStyle: [['solved', style.gameSolved]],
    });

    this.view.render([this.timer.view, this.cardsField.view]);
  }

  clear(): void {
    this.model = undefined;
    this.cards = [];
    this.cardsField.view.clear();
  }

  async newGame(category: keyof typeof CardImagesCategory, amount: keyof CardFieldTypes): Promise<void> {
    this.clear();

    const urls = await this.cardImagesService.getUrls(category, amount);
    if (!urls) return;
    const cardModels = urls.front.map((url, id) => new CardModel(id, url, urls.back));

    this.cards = cardModels.map((model) => new Card(model));
    this.cards.forEach((card) =>
      card.onClick(() => this.cardClickHandler(card))
    );

    this.cardsField.render(this.cards, amount);
    this.model = new GameModel(cardModels);
    this.model.showAllCards();
    await this.timer.countdown(SHOW_TIME);
    this.model.start();
    this.timer.start();

    this.model.onSolved(() => {
      this.timer.stop();
      this.view.setCssState('solved', true);
    });
  }

  async stopGame(): Promise<void> {
    this.timer.reset();
    this.model?.stop();
    this.clear();
  }

  private async cardClickHandler(card: Card): Promise<boolean> {
    if (!this.model) return false;
    return this.model.cardClickHandler(card.model);
  }
}

// ToDo:
// ✔️ На игровом поле должен присутствовать таймер.
// ✔️ В случае несовпадения карточек, неправильная пара должна быть подсвечена красным.
// ✔️ Совпавшие пары должны подсвечиваться зеленым.
// ⌛ После нахождения всех совпадений необходимо показать модальное окно с поздравлениями.
// ⌛ После клика на кнопку "ОК" в этом окне приложение должно перейти на страницу рекордов.
