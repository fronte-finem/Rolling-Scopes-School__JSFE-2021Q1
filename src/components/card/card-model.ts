import { Model, ModelState } from 'shared/models/model';
import { delay } from 'shared/timer-utils';

export interface ICardModelState extends ModelState {
  isError: boolean;
  isMatch: boolean;
  isFrontSide: boolean;
  clickedCount: number;
  errorCount: number;
}

export class CardModel extends Model<ICardModelState> {
  public constructor(
    public readonly id: number,
    public readonly frontImage: string,
    public readonly backImage: string,
    public readonly mismatchShowTime: number
  ) {
    super({
      isError: false,
      isMatch: false,
      isFrontSide: false,
      clickedCount: 0,
      errorCount: 0,
    });
  }

  public flip(toFront: boolean): void {
    if (this.state.isMatch || this.state.isError) return;
    this.state.isFrontSide = toFront;
  }

  public match(isMatch: boolean): void {
    this.state.isMatch = isMatch;
  }

  public async error(): Promise<void> {
    if (this.state.isMatch) return;
    this.state.errorCount += 1;
    this.state.isError = true;
    await delay(this.mismatchShowTime * 1000);
    this.state.isError = false;
    this.flip(false);
  }

  public click(): void {
    if (this.state.isMatch || this.state.isError || this.state.isFrontSide) {
      return;
    }
    this.flip(true);
    this.state.clickedCount += 1;
  }
}
