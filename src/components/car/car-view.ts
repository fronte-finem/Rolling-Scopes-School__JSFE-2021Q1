import { View } from 'shared/view';

import { CAR_CSS_CLASS, CAR_CSS_VAR } from './car.css';
import { CarState } from './car-congfig';
import { CarModel } from './car-model';

export class CarView extends View<CarModel> {
  private state = CarState.INITIAL;

  private stateMachine = new Map<CarState, (car: CarModel) => void>();

  public constructor(model: CarModel) {
    super(CAR_CSS_CLASS.car);
    this.init();
    model.onUpdate((car: CarModel) => this.update(car));
    model.onDrive((car: CarModel) => this.drive(car));
    this.update(model);
  }

  protected init(): void {
    this.stateMachine.set(CarState.INITIAL, (car) => {
      this.setCssState(CAR_CSS_CLASS.broken, false);
      this.setCssState(CAR_CSS_CLASS.finish, false);
      this.setCssVar(CAR_CSS_VAR.position, `${car.position}%`);
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

  public update(car: CarModel): void {
    this.setCssVar(CAR_CSS_VAR.color, car.color);
  }

  public drive(car: CarModel): void {
    this.stateMachine.get(car.state)?.(car);
  }
}
