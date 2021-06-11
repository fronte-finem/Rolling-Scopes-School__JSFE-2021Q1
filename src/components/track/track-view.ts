import { ButtonView } from 'components/button';
import { CarModel, CarView } from 'components/car';
import { createElement } from 'shared/dom-utils';
import { Observer } from 'shared/observer';
import { Maybe } from 'shared/types';
import { View } from 'shared/view';

import { TRACK_CSS_CLASS } from './track.css';
import { TrackButton, TrackEvent, TrackState } from './track-config';

export class TrackView extends View {
  private observer = new Observer<TrackEvent>();
  private btnSelect = new ButtonView(TrackButton.SELECT);
  private btnRemove = new ButtonView(TrackButton.REMOVE);
  private btnStart = new ButtonView(TrackButton.START);
  private btnStop = new ButtonView(TrackButton.STOP);
  private carName = createElement(TRACK_CSS_CLASS.carName);
  private track = createElement(TRACK_CSS_CLASS.track);
  public carModel: Maybe<CarModel> = null;
  private carView = new CarView(this.carModel);

  public constructor() {
    super(TRACK_CSS_CLASS.root);
    this.init();
    this.reset();
  }

  private init(): void {
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
    this.track.appendChild(this.carView.getRoot());
    this.root.append(header, body);
  }

  private get buttons() {
    return [this.btnSelect, this.btnRemove, this.btnStart, this.btnStop];
  }

  public reset(): void {
    this.carModel?.reset();
    this.carModel = null;
    this.carName.textContent = '';
    this.carView.update(null);
    this.switchButtons(TrackState.EMPTY);
  }

  public update(model: Maybe<CarModel>): void {
    if (model === this.carModel) return;
    if (!model) {
      this.reset();
      return;
    }
    this.carModel = model;
    model.onUpdate((car) => {
      this.updateName(car);
      this.carView.update(car);
    });
    model.onDrive((car) => this.carView.drive(car));
    this.updateName(model);
    this.carView.update(model);
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
    this.observer.notify(TrackEvent.SELECT, this.carModel);
  }

  public onSelect(listener: (car: Maybe<CarModel>) => void): void {
    this.observer.addListener(TrackEvent.SELECT, listener);
  }

  private remove(): void {
    this.observer.notify(TrackEvent.REMOVE, this.carModel);
  }

  public onRemove(listener: (car: Maybe<CarModel>) => void): void {
    this.observer.addListener(TrackEvent.REMOVE, listener);
  }

  private start(): void {
    this.switchButtons(TrackState.DRIVE);
    this.observer.notify(TrackEvent.START, this.carModel);
  }

  public onStart(listener: (car: Maybe<CarModel>) => void): void {
    this.observer.addListener(TrackEvent.START, listener);
  }

  private stop(): void {
    this.switchButtons(TrackState.INITIAL);
    this.observer.notify(TrackEvent.STOP, this.carModel);
  }

  public onStop(listener: (car: Maybe<CarModel>) => void): void {
    this.observer.addListener(TrackEvent.STOP, listener);
  }
}
