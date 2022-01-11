import { ButtonView } from 'components/button';
import { CarView } from 'components/car';
import { REST_API } from 'services/rest-api';
import { createElement } from 'shared/dom-utils';
import { View } from 'shared/view';

import { CarInputButton, DEFAULT_CAR_DTO } from './config';
import styles from './style.module.scss';

export class CarInputView extends View {
  private nameInput = createElement([styles.input, styles.name], { tag: 'input' });
  private colorInput = createElement([styles.input, styles.color], { tag: 'input' });
  private btnSubmit = new ButtonView(CarInputButton.SUBMIT);
  private btnCancel = new ButtonView(CarInputButton.CANCEL);
  private carView = new CarView(null, true, [styles.bigBug]);

  public onSubmit?: (carDTO: REST_API.CarDTO) => void;
  public onCancel?: () => void;

  public constructor(btnText: string, private initialCarDTO = DEFAULT_CAR_DTO) {
    super(styles.root);
    this.btnSubmit.update(btnText);
    this.build();
    this.init();
    this.initBinds();
  }

  private build(): void {
    const inputsWrapper = createElement(styles.inputsWrapper);
    const btnsWrapper = createElement(styles.btnsWrapper);
    const carWrapper = createElement(styles.carWrapper);
    inputsWrapper.append(this.nameInput, this.colorInput);
    btnsWrapper.append(this.btnSubmit.getRoot(), this.btnCancel.getRoot());
    carWrapper.append(this.carView.getRoot());
    this.root.append(inputsWrapper, carWrapper, btnsWrapper);
  }

  private init(): void {
    this.nameInput.type = 'text';
    this.colorInput.type = 'color';
    this.nameInput.value = this.initialCarDTO.name;
    this.colorInput.value = this.initialCarDTO.color;
    this.carView.applayDTO(this.carDTO);
  }

  private initBinds(): void {
    this.btnSubmit.onClick(() => this.submit());
    this.btnCancel.onClick(() => this.cancel());
    this.nameInput.addEventListener('input', () => this.inputHandler());
    this.colorInput.addEventListener('input', () => this.inputHandler());
    this.inputHandler();
    this.btnSubmit.disable();
  }

  private get carDTO(): REST_API.CarDTO {
    return {
      id: this.initialCarDTO.id,
      name: this.nameInput.value,
      color: this.colorInput.value,
    };
  }

  private inputHandler(): void {
    this.carView.applayDTO(this.carDTO);
    this.btnSubmit.switch(!!this.nameInput.value);
  }

  private submit(): void {
    if (!this.onSubmit) return;
    this.onSubmit(this.carDTO);
  }

  private cancel(): void {
    this.reset();
    this.onCancel?.();
    this.btnSubmit.disable();
  }

  public reset(): void {
    this.nameInput.value = this.initialCarDTO.name;
    this.colorInput.value = this.initialCarDTO.color;
    this.carView.applayDTO(this.initialCarDTO);
  }
}
