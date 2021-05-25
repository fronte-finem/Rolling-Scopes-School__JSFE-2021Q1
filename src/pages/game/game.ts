import { APP_GAME_DIFFICILTY_CONFIG } from '../../app/app.game.config';
import { BasePage, IPage } from '../base-page';
import { Card } from '../../components/card/card';
import { CardsField } from '../../components/cards-field/cards-field';
import { GameModel } from './game-model';
import { CardModel } from '../../components/card/card-model';
import { Timer } from '../../components/timer/timer';
import { ICardImagesService } from '../../services/card-images-urls';
import { IGameSettingsService } from '../../services/game-settings';
import { IUserService } from '../../services/user-service';
import styles from './game.scss';
import { AppState, IAppStateService } from '../../services/app-state';
import { countScore } from '../../services/game-service';

export class PageGame extends BasePage implements IPage {
  private readonly timer = new Timer();

  private readonly cardsField = new CardsField();

  private model?: GameModel;

  private cards: Card[] = [];

  constructor(
    private appStateService: IAppStateService,
    private gameSettingsService: IGameSettingsService,
    private cardImagesService: ICardImagesService,
    private userService: IUserService
  ) {
    super({ classNames: [styles.game] });

    this.view.render([this.timer.view, this.cardsField.view]);
  }

  init(): void {
    this.newGame().then(null, null);
  }

  stop(): void {
    this.stopGame();
  }

  private stopGame(): void {
    this.timer.reset();
    this.model?.stop();
    this.model = undefined;
    this.cards = [];
    this.cardsField.view.clear();
    this.view.setCssState(styles.gameSolved, false);
  }

  private async newGame(): Promise<void> {
    this.stopGame();

    const settings = await this.gameSettingsService.loadSettings();
    const urls = await this.cardImagesService.getUrls(
      settings.cardImagesCategory,
      settings.cardsAmount
    );
    if (!urls) return;
    const cardModels = urls.front.map(
      (url, id) => new CardModel(id, url, urls.back)
    );

    this.cards = cardModels.map((model) => new Card(model));
    this.cards.forEach((card) =>
      card.onClick(() => this.cardClickHandler(card))
    );

    this.cardsField.render(this.cards, settings.cardsAmount);
    this.model = new GameModel(cardModels);
    this.model.showAllCards();
    await this.timer.countdown(
      APP_GAME_DIFFICILTY_CONFIG[settings.cardsAmount].initialShowTime
    );
    this.model.start();
    this.timer.start();

    this.model.onSolved(() => {
      this.timer.stop();
      this.view.setCssState(styles.gameSolved, true);
      if (!this.model) return;
      const score = countScore(this.model.getMatches(), this.timer.model.diff);
      this.userService
        .updateUserAchievement(score, this.timer.model.diff)
        .then(null, null);
      this.appStateService
        .requestStateChange({ from: AppState.GAME, to: AppState.SOLVED })
        .then(null, null);
    });
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
