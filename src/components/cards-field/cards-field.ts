import { View } from '../../shared/views/view';
import { Card } from '../card/card';
import { CardFieldModel } from './card-field-model';
import style from './cards-field.scss';

const CSS_VAR_CARDS_COLUMNS = '--cards-columns';
const CSS_VAR_CARDS_ROWS = '--cards-rows';

export class CardsField {
  public readonly view = new View({ classNames: [style.cardsField] });

  public render(cards: Card[], model: CardFieldModel): void {
    this.view.clear();
    this.setRows(model.rows);
    this.setColumns(model.columns);
    this.view.render(cards.map((card) => card.view));
  }

  public setColumns(value: number): void {
    this.view.setCssVar(CSS_VAR_CARDS_COLUMNS, String(value));
  }

  public setRows(value: number): void {
    this.view.setCssVar(CSS_VAR_CARDS_ROWS, String(value));
  }
}

// Todo: try auto-arrangement
// https://stackoverflow.com/questions/339939/stacking-rectangles-to-into-the-most-square-like-arrangement-possible
