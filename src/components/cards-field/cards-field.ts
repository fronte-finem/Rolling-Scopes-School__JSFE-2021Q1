import style from './cards-field.scss';
import { Factory } from '../../shared/views/view-factory';
import { Card } from '../card/card';
import { CARD_FIELD_SET, CardFieldTypes } from './card-field-model';

const CSS_VAR_CARDS_COLUMNS = '--cards-columns';
const CSS_VAR_CARDS_ROWS = '--cards-rows';

export class CardsField {
  readonly view = Factory.view({ styles: [style.cardsField] });

  render(cards: Card[], amount: keyof CardFieldTypes): void {
    this.view.clear();
    const [columns, rows] = CARD_FIELD_SET[amount];
    this.columns = columns;
    this.rows = rows;
    this.view.render(cards.map((card) => card.view));
  }

  get columns(): number {
    return Number(this.view.getCssVar(CSS_VAR_CARDS_COLUMNS));
  }

  set columns(value: number) {
    this.view.setCssVar(CSS_VAR_CARDS_COLUMNS, String(value));
  }

  get rows(): number {
    return Number(this.view.getCssVar(CSS_VAR_CARDS_ROWS));
  }

  set rows(value: number) {
    this.view.setCssVar(CSS_VAR_CARDS_ROWS, String(value));
  }
}

// Todo: auto-arrangement
// https://stackoverflow.com/questions/339939/stacking-rectangles-to-into-the-most-square-like-arrangement-possible
