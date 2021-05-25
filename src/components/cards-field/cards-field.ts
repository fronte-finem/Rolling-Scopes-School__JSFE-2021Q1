import { APP_GAME_DIFFICILTY_CONFIG } from '../../app/app.game.config';
import { CardsAmount } from '../../pages/game/game-types';
import { View } from '../../shared/views/view';
import { Card } from '../card/card';
import style from './cards-field.scss';

const CSS_VAR_CARDS_COLUMNS = '--cards-columns';
const CSS_VAR_CARDS_ROWS = '--cards-rows';

export class CardsField {
  readonly view = new View({ classNames: [style.cardsField] });

  render(cards: Card[], amount: CardsAmount): void {
    this.view.clear();
    const [columns, rows] = APP_GAME_DIFFICILTY_CONFIG[amount].cardField;
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

// Todo: try auto-arrangement
// https://stackoverflow.com/questions/339939/stacking-rectangles-to-into-the-most-square-like-arrangement-possible
