import { ButtonView } from 'components/button';
import { CAR_EMPTY_ID, CarModel, CarView } from 'components/car';
import { createElement } from 'shared/dom-utils';
import { Observer } from 'shared/observer';
import { View } from 'shared/view';

import { TRACK_CSS_CLASS } from './track.css';
import { TrackButton, TrackEvent, TrackState } from './track-config';

export class TrackView extends View<CarModel> {
  private observer = new Observer<TrackEvent>();
  private id: number = CAR_EMPTY_ID;
  private carName = createElement(TRACK_CSS_CLASS.carName);
  private track = createElement(TRACK_CSS_CLASS.track);
  private btnSelect = new ButtonView(TrackButton.SELECT);
  private btnRemove = new ButtonView(TrackButton.REMOVE);
  private btnStart = new ButtonView(TrackButton.START);
  private btnStop = new ButtonView(TrackButton.STOP);

  public constructor() {
    super(TRACK_CSS_CLASS.root);
    this.init();
  }

  public get carID(): number {
    return this.id;
  }

  protected init(): void {
    this.switchButtons();
    this.btnSelect.onClick(() => this.select());
    this.btnRemove.onClick(() => this.remove());
    this.btnStart.onClick(() => this.start());
    this.btnStop.onClick(() => this.stop());
    const buttons = createElement(TRACK_CSS_CLASS.buttons);
    buttons.append(...this.buttons.map((btn) => btn.getRoot()));
    this.root.append(buttons);
    const wrapper = createElement(TRACK_CSS_CLASS.wrapper);
    wrapper.append(this.track);
    this.root.append(this.carName, wrapper);
  }

  private get buttons() {
    return [this.btnSelect, this.btnRemove, this.btnStart, this.btnStop];
  }

  public update(carModel: CarModel | null): void {
    this.id = carModel?.id || CAR_EMPTY_ID;
    this.destroy();
    if (carModel) {
      const carView = new CarView(carModel);
      this.carName.textContent = carModel.name;
      this.track.append(carView.getRoot());
      this.switchButtons();
    } else {
      this.switchButtons(TrackState.EMPTY);
    }
  }

  protected hookDestroy(): boolean {
    this.carName.textContent = '';
    this.track.innerHTML = '';
    return true;
  }

  public switchButtons(state = TrackState.INITIAL): void {
    const enable = state === TrackState.INITIAL;
    this.btnSelect.switch(enable);
    this.btnRemove.switch(enable);
    this.btnStart.switch(enable);
    this.btnStop.switch(state === TrackState.DRIVE);
  }

  private select(): void {
    this.observer.notify(TrackEvent.SELECT, this.carID);
  }

  public onSelect(listener: (carID: number) => void): void {
    this.observer.addListener(TrackEvent.SELECT, listener);
  }

  private remove(): void {
    this.observer.notify(TrackEvent.REMOVE, this.carID);
  }

  public onRemove(listener: (carID: number) => void): void {
    this.observer.addListener(TrackEvent.REMOVE, listener);
  }

  private start(): void {
    this.switchButtons(TrackState.DRIVE);
    this.observer.notify(TrackEvent.START, this.carID);
  }

  public onStart(listener: (carID: number) => void): void {
    this.observer.addListener(TrackEvent.START, listener);
  }

  private stop(): void {
    this.switchButtons(TrackState.INITIAL);
    this.observer.notify(TrackEvent.STOP, this.carID);
  }

  public onStop(listener: (carID: number) => void): void {
    this.observer.addListener(TrackEvent.STOP, listener);
  }
}
