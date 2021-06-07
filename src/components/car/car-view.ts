import { createElement } from 'shared/dom-utils';
import { View } from 'shared/view';

import { CAR_CSS_CLASS, CAR_CSS_VAR } from './car.css';
import { CarModel, CarState } from './car-model';

export class CarView extends View<CarModel> {
  private state = CarState.INITIAL;
  private car = createElement(CAR_CSS_CLASS.body);

  public constructor(model: CarModel) {
    super(CAR_CSS_CLASS.frame);
    this.init();
    model.onUpdate((car: CarModel) => this.update(car));
    this.update(model);
  }

  protected init(): void {
    this.root.append(this.car);
  }

  public update(car: CarModel): void {
    this.setCssVar(CAR_CSS_VAR.color, car.color);
    switch (car.state) {
      case CarState.INITIAL:
        this.setCssState(CAR_CSS_CLASS.broken, false);
        this.setCssVar(CAR_CSS_VAR.position, `${car.position}%`);
        break;
      case CarState.DRIVE:
        this.setCssVar(CAR_CSS_VAR.position, `${car.position}%`);
        break;
      case CarState.BROKEN:
        this.setCssState(CAR_CSS_CLASS.broken, true);
        break;
      default:
        break;
    }
  }
}
