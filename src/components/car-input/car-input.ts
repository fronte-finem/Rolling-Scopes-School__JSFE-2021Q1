import { ButtonView } from 'components/button';
import { CAR_EMPTY_ID, CarModel } from 'components/car/car-model';
import { createElement } from 'shared/dom-utils';
import { Observer } from 'shared/observer';
import { View } from 'shared/view';

import { CAR_INPUT_CSS_CLASS } from './car-input.css';

export enum CarInputEvent {
  INPUT = 'input',
  SUBMIT = 'submit',
}

export class CarInputView extends View<CarModel> {
  private observer = new Observer<CarInputEvent>();
  private nameInput = createElement(CAR_INPUT_CSS_CLASS.name, { tag: 'input' });
  private colorInput = createElement(CAR_INPUT_CSS_CLASS.color, { tag: 'input' });
  private btnSubmit = new ButtonView(CarInputEvent.SUBMIT);
  private id = CAR_EMPTY_ID;
  private car?: CarModel;

  public constructor(btnText: string) {
    super(CAR_INPUT_CSS_CLASS.carInput);
    this.btnSubmit.update(btnText);
    this.init();
  }

  protected init(): void {
    this.nameInput.type = 'text';
    this.colorInput.type = 'color';
    this.btnSubmit.onClick(() => this.submit());
    this.nameInput.addEventListener('input', () => this.submitSwitch());
    this.submitSwitch();
    this.root.append(this.nameInput, this.colorInput, this.btnSubmit.getRoot());
  }

  public getId(): number {
    return this.id;
  }

  private submitSwitch(): void {
    this.btnSubmit.switch(!!this.nameInput.value);
  }

  private submit(): void {
    const car = this.car || new CarModel();
    car.name = this.nameInput.value;
    car.color = this.colorInput.value;
    this.observer.notify<CarModel>(CarInputEvent.SUBMIT, car);
  }

  public onSubmit(listener: (car: CarModel) => void): void {
    this.observer.addListener(CarInputEvent.SUBMIT, listener);
  }

  public update(car: CarModel): void {
    this.car = car;
    this.id = car.id;
    this.nameInput.value = car.name;
    this.colorInput.value = car.color;
  }

  public reset(): void {
    this.update(new CarModel());
    this.disable();
  }

  public enable(): void {
    this.switch(true);
  }

  public disable(): void {
    this.switch(false);
  }

  private switch(enable = true): void {
    this.btnSubmit.switch(enable);
    this.nameInput.disabled = !enable;
    this.colorInput.disabled = !enable;
  }
}
