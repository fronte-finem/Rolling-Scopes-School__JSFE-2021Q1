import { Maybe } from 'shared/types';
import { View } from 'shared/view';

import { CAR_CSS_CLASS, CAR_CSS_VAR } from './car.css';
import { CarState } from './car-congfig';
import { CarModel } from './car-model';

export class CarView extends View {
  private stateMachine = new Map<CarState, (car: CarModel) => void>();

  public constructor(model: Maybe<CarModel>) {
    super(CAR_CSS_CLASS.car);
    this.init();
    this.update(model);
  }

  private init(): void {
    this.stateMachine.set(CarState.INITIAL, () => {
      this.setCssState(CAR_CSS_CLASS.hidden, false);
      this.setCssState(CAR_CSS_CLASS.broken, false);
      this.setCssState(CAR_CSS_CLASS.finish, false);
      this.setCssVar(CAR_CSS_VAR.position, '0%');
    });
    this.stateMachine.set(CarState.DRIVE, (car) => {
      this.setCssVar(CAR_CSS_VAR.position, `${car.position}%`);
    });
    this.stateMachine.set(CarState.BROKEN, () => {
      this.setCssState(CAR_CSS_CLASS.broken, true);
    });
    this.stateMachine.set(CarState.FINISH, () => {
      this.setCssState(CAR_CSS_CLASS.finish, true);
    });
  }

  public update(model: Maybe<CarModel>): void {
    if (!model) {
      this.setCssState(CAR_CSS_CLASS.hidden, true);
    } else {
      this.setCssState(CAR_CSS_CLASS.hidden, false);
      this.setCssVar(CAR_CSS_VAR.color, model.color);
    }
  }

  public drive(car: CarModel): void {
    this.stateMachine.get(car.state)?.(car);
  }
}
