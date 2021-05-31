import { IEquality, IToString } from 'shared/models/types';

export interface ICardFieldOptions {
  rows: number;
  columns: number;
}

export class CardFieldModel implements IToString, IEquality {
  public constructor(
    public readonly rows: number,
    public readonly columns: number
  ) {}

  public getCardsAmount(): number {
    return this.rows * this.columns;
  }

  public toString(): string {
    return `${this.rows} × ${this.columns}`;
  }

  public equal(model: CardFieldModel): boolean {
    return model.rows === this.rows && model.columns === this.columns;
  }
}
