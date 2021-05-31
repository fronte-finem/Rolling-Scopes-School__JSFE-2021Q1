import { IPage } from 'app/configs/types.config';
import { Card } from 'components/card/card';
import { CardModel } from 'components/card/card-model';
import { CardsField } from 'components/cards-field/cards-field';
import { Timer } from 'components/timer/timer';
import { AppState, IAppStateService } from 'services/app-state';
import { ICardImagesService } from 'services/card-images-urls';
import { calcScore } from 'services/game-logic';
import { IGameSettings, IGameSettingsService } from 'services/game-settings';
import { IUserService } from 'services/user-service';

import { BasePage } from '../base-page';

import { GameModel } from './game-model';

import styles from './game.scss';

export class PageGame extends BasePage implements IPage {
  private readonly timer = new Timer();

  private readonly cardsField = new CardsField();

  private model?: GameModel;

  private cards: Card[] = [];

  public constructor(
    private appStateService: IAppStateService,
    private gameSettingsService: IGameSettingsService,
    private cardImagesService: ICardImagesService,
    private userService: IUserService
  ) {
    super({ classNames: [styles.game] });

    this.view.render([this.timer.view, this.cardsField.view]);
  }

  public init(): void {
    void this.newGame();
  }

  public stop(): void {
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
    const settings = this.gameSettingsService.load();
    const cardModels = await this.initCards(settings);
    this.model = new GameModel(cardModels);
    this.model.showAllCards();
    await this.timer.countdown(settings.initialShowTime);
    this.model.start();
    this.timer.start();
    this.model.onSolved(() => this.succesEndGame(settings));
  }

  private async initCards(settings: IGameSettings): Promise<CardModel[]> {
    const urls = await this.cardImagesService.getUrls(
      settings.cardImagesCategory,
      settings.cardsField.getCardsAmount()
    );
    if (!urls) throw new Error('Cards images urls generation failed');
    const cardModels = urls.front.map(
      (url, id) => new CardModel(id, url, urls.back, settings.mismatchShowTime)
    );
    this.cards = cardModels.map((model) => new Card(model));
    this.cards.forEach((card) =>
      card.onClick(() => this.cardClickHandler(card))
    );
    this.cardsField.render(this.cards, settings.cardsField);
    return cardModels;
  }

  private succesEndGame(settings: IGameSettings): void {
    this.timer.stop();
    this.view.setCssState(styles.gameSolved, true);
    if (!this.model) return;
    const score = calcScore(
      this.model.getMatches(),
      this.timer.model.diff,
      settings
    );
    void this.userService.updateUserAchievement(
      score,
      this.timer.model.diff,
      settings.cardsField.toString()
    );
    void this.appStateService.requestStateChange({
      from: AppState.GAME,
      to: AppState.SOLVED,
    });
  }

  private async cardClickHandler(card: Card): Promise<boolean> {
    if (!this.model) return false;
    return this.model.cardClickHandler(card.model);
  }
}
