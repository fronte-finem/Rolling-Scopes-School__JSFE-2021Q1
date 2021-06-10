import { ButtonView } from 'components/button';
import { CarModel, CarView } from 'components/car';
import { createElement } from 'shared/dom-utils';
import { Observer } from 'shared/observer';
import { Maybe } from 'shared/types';
import { View } from 'shared/view';

import { TRACK_CSS_CLASS } from './track.css';
import { TrackButton, TrackEvent, TrackState } from './track-config';

export class TrackView extends View<CarModel> {
  private observer = new Observer<TrackEvent>();
  private carName = createElement(TRACK_CSS_CLASS.carName);
  private track = createElement(TRACK_CSS_CLASS.track);
  private btnSelect = new ButtonView(TrackButton.SELECT);
  private btnRemove = new ButtonView(TrackButton.REMOVE);
  private btnStart = new ButtonView(TrackButton.START);
  private btnStop = new ButtonView(TrackButton.STOP);
  public car: Maybe<CarModel> = null;

  public constructor() {
    super(TRACK_CSS_CLASS.root);
    this.init();
    this.reset();
  }

  protected init(): void {
    this.switchButtons();
    this.btnSelect.onClick(() => this.select());
    this.btnRemove.onClick(() => this.remove());
    this.btnStart.onClick(() => this.start());
    this.btnStop.onClick(() => this.stop());
    const header = createElement(TRACK_CSS_CLASS.header);
    header.append(...this.buttons.map((btn) => btn.getRoot()), this.carName);
    this.root.append(header);
    const body = createElement(TRACK_CSS_CLASS.body);
    body.append(this.track);
    this.root.append(header, body);
  }

  private get buttons() {
    return [this.btnSelect, this.btnRemove, this.btnStart, this.btnStop];
  }

  public reset(): void {
    this.car?.reset();
    this.car = null;
    this.carName.textContent = '';
    this.track.innerHTML = '';
    this.switchButtons(TrackState.EMPTY);
  }

  public update(maybeCar: Maybe<CarModel>): void {
    this.reset();
    if (!maybeCar) return;
    this.car = maybeCar;
    maybeCar.onUpdate((car) => this.updateName(car));
    this.updateName(maybeCar);
    const carView = new CarView(maybeCar);
    this.track.appendChild(carView.getRoot());
    this.switchButtons();
  }

  private updateName(car: CarModel): void {
    this.carName.textContent = car.name;
  }

  public switchButtons(state = TrackState.INITIAL): void {
    const enable = state === TrackState.INITIAL;
    this.btnSelect.switch(state !== TrackState.EMPTY);
    this.btnRemove.switch(enable);
    this.btnStart.switch(enable);
    this.btnStop.switch(state === TrackState.DRIVE);
  }

  private select(): void {
    this.observer.notify(TrackEvent.SELECT, this.car);
  }

  public onSelect(listener: (car: Maybe<CarModel>) => void): void {
    this.observer.addListener(TrackEvent.SELECT, listener);
  }

  private remove(): void {
    this.observer.notify(TrackEvent.REMOVE, this.car);
  }

  public onRemove(listener: (car: Maybe<CarModel>) => void): void {
    this.observer.addListener(TrackEvent.REMOVE, listener);
  }

  private start(): void {
    this.switchButtons(TrackState.DRIVE);
    this.observer.notify(TrackEvent.START, this.car);
  }

  public onStart(listener: (car: Maybe<CarModel>) => void): void {
    this.observer.addListener(TrackEvent.START, listener);
  }

  private stop(): void {
    this.switchButtons(TrackState.INITIAL);
    this.observer.notify(TrackEvent.STOP, this.car);
  }

  public onStop(listener: (car: Maybe<CarModel>) => void): void {
    this.observer.addListener(TrackEvent.STOP, listener);
  }
}
