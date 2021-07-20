import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { getAudioUrl, PLACEHOLDER } from 'app/config';
import { playAudio, playAudioAsyncCancelable } from 'services/audio';
import { GameSoundEffect, GameStatus } from 'services/game/config';
import { WordDocument } from 'services/rest-api/config';
import { WordsStatsService } from 'services/word-stat/service';
import { randomItem } from 'utils/random';

export class Game {
  @observable public status: GameStatus = GameStatus.INITIAL;
  @observable public activeRoutePath = '';
  @observable public activeWord?: WordDocument;
  @observable public words: WordDocument[] = [];
  @observable public mistakes = 0;
  @observable public asyncOperation?: Promise<void>;
  @observable public cancelAsyncOperation?: () => void;

  public constructor(private wordsStatsService: WordsStatsService) {
    makeObservable(this);
  }

  private reset(): void {
    this.status = GameStatus.INITIAL;
    this.activeRoutePath = '';
    this.activeWord = undefined;
    this.words = [];
    this.mistakes = 0;
    this.asyncOperation = undefined;
    this.cancelAsyncOperation = undefined;
  }

  @action public enable(): void {
    this.status = GameStatus.READY;
  }

  @action public disable(): void {
    this.cancelAsyncOperation?.();
    this.reset();
  }

  @action public start(words: WordDocument[], routePath: string): void {
    this.reset();
    this.status = GameStatus.START;
    this.activeRoutePath = routePath;
    this.words = [...words];
    this.toNextWord();
  }

  @action public toNextWord(): void {
    this.activeWord = randomItem(this.words);
    this.vocalize();
  }

  @action public vocalize(): void {
    this.status = GameStatus.VOCALIZE;
    playAudio(getAudioUrl(this.activeWord?.audio || PLACEHOLDER));
    this.toMatching();
  }

  @action public toMatching(): void {
    if (this.isGameMode) this.status = GameStatus.MATCHING;
  }

  @action public matchWord(wordId: string): void {
    const isMatch = wordId === this.activeWord?._id;
    this.status = isMatch ? GameStatus.HIT : GameStatus.MISS;
    isMatch ? this.hit(wordId) : this.miss();
  }

  @action public hit(wordId: string): void {
    this.words = this.words.filter((word) => word._id !== wordId);
    this.activeWord && this.wordsStatsService.matchInc(this.activeWord._id);
    if (!this.isGameEnd) {
      playAudio(GameSoundEffect.YES);
      this.toNextWord();
    } else {
      void this.toShowResult();
    }
  }

  @action public miss(): void {
    this.mistakes += 1;
    this.activeWord && this.wordsStatsService.errorInc(this.activeWord._id);
    playAudio(GameSoundEffect.NO);
    this.toMatching();
  }

  public async toShowResult(): Promise<void> {
    this.status = GameStatus.SHOW_RESULT;
    const soundSrc = this.isWin ? GameSoundEffect.WIN : GameSoundEffect.FAIL;
    const [promise, cancel] = playAudioAsyncCancelable(soundSrc);
    this.asyncOperation = promise;
    this.cancelAsyncOperation = cancel;
    await this.asyncOperation;
    runInAction(() => {
      this.toMainPage();
    });
  }

  @action public toMainPage(): void {
    if (this.isGameMode) this.status = GameStatus.END;
  }

  @action public ready(): void {
    this.status = GameStatus.READY;
  }

  @computed public get isGameMode(): boolean {
    return this.status !== GameStatus.INITIAL;
  }

  @computed public get isGameReady(): boolean {
    return this.status === GameStatus.READY;
  }

  @computed public get isGamePlay(): boolean {
    return this.status === GameStatus.MATCHING;
  }

  @computed public get isStarted(): boolean {
    return this.isGameMode && !this.isGameReady;
  }

  @computed public get isGameEnd(): boolean {
    return this.isStarted && this.words.length === 0;
  }

  @computed public get isWin(): boolean {
    return this.isGameEnd && this.mistakes === 0;
  }

  @computed public get isFail(): boolean {
    return this.isGameEnd && this.mistakes > 0;
  }

  @computed public get isEnd(): boolean {
    return this.status === GameStatus.END;
  }

  public isWordMatch(wordId: string): boolean {
    return this.isStarted && wordId === this.activeWord?._id;
  }

  public isWordSolved(wordId: string): boolean {
    return this.isStarted && this.words.every((word) => word._id !== wordId);
  }

  public isOtherRoutePath(currentRoutePath: string): boolean {
    return this.activeRoutePath !== currentRoutePath;
  }
}
