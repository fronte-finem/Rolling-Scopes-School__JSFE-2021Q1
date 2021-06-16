import { ButtonView } from 'components/button';
import { ButtonType } from 'components/button/config';
import { CarModel, CarView } from 'components/car';
import { TrackInfoView } from 'components/track-info';
import { createElement } from 'shared/dom-utils';
import { Maybe } from 'shared/types';
import { View } from 'shared/view';

import { TrackButton, TrackState } from './config';
import styles from './style.module.scss';

export class TrackView extends View {
  private stateMap = new Map<TrackState, () => void>();
  private btnStart = new ButtonView(TrackButton.START, ButtonType.START);
  private btnStop = new ButtonView(TrackButton.STOP, ButtonType.STOP);
  private track = createElement(styles.track);
  private name = createElement(styles.name);
  private info = new TrackInfoView(styles.info);
  public carModel: Maybe<CarModel> = null;
  private carView = new CarView(this.carModel);

  public onSelect?: (car: Maybe<CarModel>) => void;
  public onRemove?: (car: Maybe<CarModel>) => Promise<void>;
  public onStart?: (car: Maybe<CarModel>) => Promise<void>;
  public onStop?: (car: Maybe<CarModel>) => Promise<void>;

  public constructor() {
    super(styles.root);
    this.build();
    this.init();
    this.initStateMap();
    this.reset();
  }

  private get buttons() {
    return [this.btnStart, this.btnStop];
  }

  private build(): void {
    const btnsWrapper = createElement(styles.btnsWrapper);
    btnsWrapper.append(...this.buttons.map((btn) => btn.getRoot()));
    this.root.append(btnsWrapper);
    const body = createElement(styles.body);
    body.append(this.track);
    this.track.append(this.name, this.info.getRoot(), this.carView.getRoot());
    this.root.append(btnsWrapper, body);
  }

  private init(): void {
    this.btnStart.onClick(() => this.start());
    this.btnStop.onClick(() => this.stop());
    this.carView.onSelect = () => this.onSelect?.(this.carModel);
    this.carView.onRemove = () => this.remove();
    this.setCssState(styles.showInfo, false);
  }

  private initStateMap(): void {
    this.stateMap.set(TrackState.INITIAL, () => this.toInitialState());
    this.stateMap.set(TrackState.DRIVE, () => this.toRunState());
    this.stateMap.set(TrackState.EMPTY, () => this.toEmptyState());
  }

  public deselect(): void {
    this.carView.deselect();
  }

  private async remove(): Promise<void> {
    if (!this.carModel || !this.onRemove) return;
    this.switch(TrackState.EMPTY);
    await this.onRemove?.(this.carModel);
    this.switch(TrackState.INITIAL);
  }

  private async start(): Promise<void> {
    if (!this.carModel || !this.onStart) return;
    this.switch(TrackState.DRIVE);
    await this.onStart?.(this.carModel);
  }

  private async stop(): Promise<void> {
    if (!this.carModel || !this.onStop) return;
    await this.onStop?.(this.carModel);
    this.switch(TrackState.INITIAL);
  }

  public reset(): void {
    this.carModel?.reset();
    this.carModel = null;
    this.name.textContent = '';
    this.carView.update(null);
    this.switch(TrackState.EMPTY);
  }

  public update(model: Maybe<CarModel>): void {
    if (model === this.carModel) return;
    if (!model) {
      this.reset();
      return;
    }
    this.carModel = model;
    model.onUpdate = (car) => {
      this.updateName(car);
      this.carView.update(car);
    };
    model.onDrive = (car) => this.carView.applyCarModelState(car);
    this.updateName(model);
    this.carView.update(model);
    this.switch(TrackState.INITIAL);
  }

  private updateName(car: CarModel): void {
    this.name.textContent = car.name;
  }

  public switch(state = TrackState.INITIAL): void {
    this.stateMap.get(state)?.();
  }

  private toInitialState(): void {
    this.btnStart.switch(true);
    this.btnStop.switch(false);
    this.setCssState(styles.showInfo, false);
    this.show();
  }

  private toRunState(): void {
    this.btnStart.switch(false);
    this.btnStop.switch(true);
  }

  private toEmptyState(): void {
    this.btnStart.switch(false);
    this.btnStop.switch(false);
  }

  public show(place?: number): void {
    if (place && this.carModel) {
      this.info.update(place, this.carModel);
      this.setCssState(styles.showInfo, true);
      if (place < 4) this.setCssState(styles.neon, true);
      switch (place) {
        case 1:
          this.setCssState(styles.place1, true);
          break;
        case 2:
          this.setCssState(styles.place2, true);
          break;
        case 3:
          this.setCssState(styles.place3, true);
          break;
        default:
          break;
      }
    } else {
      this.info.reset(this.carModel);
      this.setCssState(styles.showInfo, false);
      this.setCssState(styles.neon, false);
      this.setCssState(styles.place1, false);
      this.setCssState(styles.place2, false);
      this.setCssState(styles.place3, false);
    }
  }
}
