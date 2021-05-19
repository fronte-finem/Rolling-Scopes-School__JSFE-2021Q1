import { Model, ModelState } from '../../shared/models/model';
import { delay } from '../../shared/timer-utils';

const ERROR_TIME = 2;

export interface ICardModelState extends ModelState {
  isError: boolean;
  isMatch: boolean;
  isFrontSide: boolean;
  clickedCount: number;
  errorCount: number;
}

export class CardModel extends Model<ICardModelState> {
  constructor(
    readonly id: number,
    readonly frontImage: string,
    readonly backImage: string
  ) {
    super({
      isError: false,
      isMatch: false,
      isFrontSide: false,
      clickedCount: 0,
      errorCount: 0,
    });
  }

  flip(toFront: boolean): void {
    if (this.state.isMatch || this.state.isError) return;
    this.state.isFrontSide = toFront;
  }

  match(isMatch: boolean): void {
    this.state.isMatch = isMatch;
  }

  async error(): Promise<void> {
    if (this.state.isMatch) return;
    this.state.errorCount += 1;
    this.state.isError = true;
    await delay(ERROR_TIME * 1000);
    this.state.isError = false;
    this.flip(false);
  }

  click(): void {
    if (this.state.isMatch || this.state.isError || this.state.isFrontSide) {
      return;
    }
    this.flip(true);
    this.state.clickedCount += 1;
  }
}
