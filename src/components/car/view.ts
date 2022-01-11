import { ButtonView } from 'components/button';
import { ButtonType } from 'components/button/config';
import { REST_API } from 'services/rest-api';
import { createElement } from 'shared/dom-utils';
import { Maybe } from 'shared/types';
import { View } from 'shared/view';

import { CarBtn, CarCSSVar, CarState, TIMEOUT, TO_STATE } from './config';
import { CarModel } from './model';
import styles from './style.module.scss';

export class CarView extends View {
  private stateMap = new Map<CarState, (car?: CarModel) => void>();
  private btnUpdate = new ButtonView(CarBtn.UPDATE, ButtonType.CUSTOM, [styles.btn, styles.update]);
  private btnRemove = new ButtonView(CarBtn.DELETE, ButtonType.CUSTOM, [styles.btn, styles.delete]);
  private btnCancel = new ButtonView(CarBtn.CANCEL, ButtonType.CUSTOM, [styles.btn, styles.cancel]);
  private selectTarget!: HTMLElement;
  public carModel: Maybe<CarModel> = null;

  public onSelect?: () => void;
  public onDeselect?: () => void;
  public onRequestUpdate?: () => void;
  public onRequestRemove?: () => void;

  public constructor(model: Maybe<CarModel>, private passive = false, className: string[] = []) {
    super([styles.car, ...className]);
    this.build();
    this.init();
    this.initStateMap();
    this.stateMap.get(CarState.INITIAL)?.();
    this.update(model);
  }

  private build(): void {
    const EyeL = createElement([styles.eye, styles.eyeLeft]);
    const EyeR = createElement([styles.eye, styles.eyeRight]);
    const legL1 = createElement([styles.leg, styles.legLeft, styles.leg1]);
    const legL2 = createElement([styles.leg, styles.legLeft, styles.leg2]);
    const legL3 = createElement([styles.leg, styles.legLeft, styles.leg3]);
    const legR1 = createElement([styles.leg, styles.legRight, styles.leg1]);
    const legR2 = createElement([styles.leg, styles.legRight, styles.leg2]);
    const legR3 = createElement([styles.leg, styles.legRight, styles.leg3]);
    const body = createElement(styles.body);
    const bodyCover = createElement(styles.bodyCover);
    this.selectTarget = bodyCover;
    body.append(legL1, legL2, legL3, legR1, legR2, legR3, bodyCover);
    bodyCover.append(EyeL, EyeR);
    this.root.append(
      body,
      this.btnUpdate.getRoot(),
      this.btnRemove.getRoot(),
      this.btnCancel.getRoot()
    );
    this.setCssState(styles.passive, this.passive);
  }

  private init() {
    this.onClick((ev) => {
      this.select(ev.target !== this.btnRemove.getRoot() && ev.target !== this.btnCancel.getRoot());
    });
    this.btnUpdate.onClick(() => this.requestUpdate());
    this.btnRemove.onClick(() => this.requestRemove());
  }

  public deselect = (): void => {
    this.select(false);
  };

  public select(ok = true): void {
    this.setCssState(styles.select, ok);
    if (ok && this.onSelect) this.onSelect();
  }

  private requestUpdate() {
    if (!this.onRequestUpdate) return;
    document.body.removeEventListener('click', this.deselect);
    this.select(false);
    this.onRequestUpdate();
  }

  private requestRemove() {
    if (!this.onRequestRemove) return;
    document.body.removeEventListener('click', this.deselect);
    this.select(false);
    this.onRequestRemove();
  }

  private initStateMap(): void {
    this.stateMap.set(CarState.INITIAL, () => this.toInitialState());
    this.stateMap.set(CarState.START, () => this.toStartState());
    this.stateMap.set(CarState.DRIVE, (car) => this.toRunState(car));
    this.stateMap.set(CarState.BROKEN, () => this.toDeadState());
    this.stateMap.set(CarState.FINISH, () => this.toFinishState());
  }

  private toInitialState(): void {
    this.setCssState(styles.hidden, false);
    this.setCssState(styles.start, false);
    this.setCssState(styles.run, false);
    this.setCssState(styles.dead, false);
    this.setCssState(styles.finish, false);
    TO_STATE.initial().forEach(([cssvar, value]) => {
      this.setCssVar(cssvar, value);
    });
  }

  private toStartState(): void {
    this.setCssState(styles.start, true);
    TO_STATE.start().forEach(([cssvar, value]) => {
      this.setCssVar(cssvar, value);
    });
  }

  private toRunState(car?: CarModel): void {
    if (!car?.position) {
      this.setCssState(styles.start, false);
      this.setCssState(styles.run, true);
      TO_STATE.run((car?.duration || TIMEOUT) / TIMEOUT).forEach(([cssvar, value]) => {
        this.setCssVar(cssvar, value);
      });
    } else {
      this.setCssVar(CarCSSVar.POSITION, `${car.position}%`);
    }
  }

  private toDeadState(): void {
    this.setCssState(styles.run, false);
    this.setCssState(styles.dead, true);
    TO_STATE.dead().forEach(([cssvar, value]) => {
      this.setCssVar(cssvar, value);
    });
  }

  private toFinishState(car?: CarModel): void {
    this.setCssState(styles.run, false);
    this.setCssState(styles.finish, true);
    TO_STATE.finish((car?.duration || TIMEOUT) / TIMEOUT).forEach(([cssvar, value]) => {
      this.setCssVar(cssvar, value);
    });
  }

  public update(model: Maybe<CarModel>): void {
    this.carModel = model;
    if (!model) {
      this.setCssState(styles.hidden, true);
    } else {
      this.setCssState(styles.hidden, false);
      this.setCssVar(CarCSSVar.COLOR, model.color);
    }
  }

  public applayDTO(carDTO: REST_API.CarDTO): void {
    this.setCssVar(CarCSSVar.COLOR, carDTO.color);
  }

  public applyCarModelState(car: CarModel): void {
    this.setCssState(styles.btnToLeft, car.position > 50);
    this.stateMap.get(car.state)?.(car);
  }
}
