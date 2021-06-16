import { ButtonView } from 'components/button';
import { ButtonType } from 'components/button/config';
import { CarModel } from 'components/car';
import { CarInputView } from 'components/car-input';
import { PopupView } from 'components/popup';
import { TrackState, TrackView } from 'components/track';
import { PageView } from 'pages/base-page';
import { REST_API } from 'services/rest-api';
import { createElement } from 'shared/dom-utils';
import { Maybe } from 'shared/types';

import { CarageButtons, GARAGE, GENERATE_COUNT } from './config';
import { GarageModel } from './model';
import styles from './style.module.scss';

// 1.2 (+5) "Garage" view should contain its name, page number, and the full amount of items in the database (how many car user has in his garage).
// 2.1 (+15) User should be able to create, update, delete a car, and see the list of the cars.
//           - Car has only two attributes: "name" and "color".
//           - For "delete"-operation car should be deleted from "garage" table as well as from "winners".
// 2.2 (+10) User should be able to select any color from an RGB-Palete and see the picture of the car colored with the color selected and car's name.
// 2.3 (+5)  Near the car's picture should be buttons to update its attributes or delete it.
// 2.4 (+10) There should be pagination on the "Garage" view (7 cars per one page).
// 2.5 (+10) There should be a button to create random cars (100 cars per click).
//           - Name should be assembled from two random parts, for example "Tesla" + "Model S", or "Ford" + "Mustang" (At least 10 different names for each part).
//           - Color should be also generated randomly.

export class GarageView extends PageView {
  private btnAddCar = new ButtonView(CarageButtons.ADD, ButtonType.DEFAULT, styles.btn);
  private btnUpdateCar = new ButtonView(CarageButtons.UPDATE, ButtonType.DEFAULT, styles.btn);
  private btnUnselect = new ButtonView(CarageButtons.UNSELECT, ButtonType.DEFAULT, styles.btn);
  private btnGenerate = new ButtonView(CarageButtons.GENERATE, ButtonType.DEFAULT, styles.btn);
  private btnRemovePage = new ButtonView(CarageButtons.REMOVE_PAGE, ButtonType.DEFAULT, styles.btn);
  private btnStartRace = new ButtonView(CarageButtons.RACE, ButtonType.START, styles.btnRace);
  private btnResetRace = new ButtonView(CarageButtons.RESET, ButtonType.STOP, styles.btnRace);
  private selected: Maybe<CarModel> = null;
  private tracks = Array.from(
    { length: REST_API.GARAGE_PAGE_LIMIT_DEFAULT },
    () => new TrackView()
  );

  public onRequestAddCar?: (carDTO: REST_API.CarDTO) => Promise<Maybe<CarModel>>;
  public onRequestUpdateCar?: (carDTO: REST_API.CarDTO) => Promise<void>;
  public onRequestRemoveCar?: (car: CarModel) => Promise<void>;
  public onRequestRemovePage?: () => Promise<void>;
  public onRequestGenerateCars?: (count: number) => Promise<CarModel[]>;
  public onRequestStartCar?: (car: CarModel) => Promise<void>;
  public onRequestStopCar?: (car: CarModel) => Promise<void>;
  public onRequestStartRace?: () => Promise<CarModel[]>;
  public onRequestResetRace?: () => Promise<void>;

  public constructor(model: GarageModel, popup: PopupView) {
    super(model, GARAGE, styles.garage, popup);
    this.build(model);
    this.initBinds();
  }

  private get buttons() {
    return [
      this.btnAddCar,
      this.btnUpdateCar,
      this.btnUnselect,
      this.btnGenerate,
      this.btnRemovePage,
    ];
  }

  private build(model: GarageModel): void {
    const controls = createElement(styles.controls);
    const btnsCars = createElement([styles.btnsWrapper, styles.btnsCar]);
    const btnsRace = createElement([styles.btnsWrapper, styles.btnsRace]);
    const tracksList = createElement(styles.tracks);
    controls.append(btnsCars, btnsRace);
    this.content.append(controls, tracksList);
    btnsCars.append(...this.buttons.map((b) => b.getRoot()));
    btnsRace.append(this.btnStartRace.getRoot(), this.btnResetRace.getRoot());
    tracksList.append(...this.tracks.map((t) => t.getRoot()));
    this.tracks.forEach((track, i) => track.update(model.cars[i]));
  }

  private initBinds() {
    this.btnAddCar.onClick(() => this.requestAddCar());
    this.btnUpdateCar.onClick(() => this.requestUpdateCar());
    this.btnUnselect.onClick(() => this.deselect());
    this.btnGenerate.onClick(() => this.requestGenerateCars());
    this.btnRemovePage.onClick(() => this.requestRemovePage());
    this.btnStartRace.onClick(() => this.requestStartRace());
    this.btnResetRace.onClick(() => this.requestResetRace());
    this.btnUpdateCar.disable();
    this.btnUnselect.disable();
    this.btnResetRace.disable();
    this.tracks.forEach((track) => this.bindTrack(track));
  }

  private requestAddCar(): void {
    const input = new CarInputView(CarageButtons.ADD);
    input.onSubmit = (carDTO) => this.submitAddCar(carDTO);
    this.popup.render(CarageButtons.ADD, input.getRoot());
  }

  private requestUpdateCar(): void {
    const input = new CarInputView(CarageButtons.UPDATE, this.selected?.carDTO);
    input.onSubmit = (carDTO) => this.submitUpdateCar(carDTO);
    this.popup.render(CarageButtons.UPDATE, input.getRoot());
  }

  private bindTrack(track: TrackView): void {
    track.onSelect = () => this.select(track);
    track.onRemove = (car) => this.requestRemoveCar(car);
    track.onStart = (car) => this.requestStartCar(car);
    track.onStop = (car) => this.requestStopCar(car);
  }

  public select(track: TrackView): void {
    if (!track.carModel) return;
    this.tracks.filter((t) => t !== track).forEach((t) => t.deselect());
    this.selected = track.carModel;
    this.btnUpdateCar.enable();
    this.btnUnselect.enable();
  }

  public deselect(): void {
    this.btnUpdateCar.disable();
    this.btnUnselect.disable();
    this.tracks.forEach((t) => t.deselect());
    this.selected = null;
  }

  protected hookRequestPage = (): void => {
    this.deselect();
    this.tracks.forEach((track) => track.show());
  };

  protected requestRemovePage = (): void => {
    this.deselect();
    this.onRequestRemovePage?.();
  };

  public updateCars(cars: CarModel[]): void {
    this.tracks.forEach((track, i) => track.update(cars[i]));
    this.btnStartRace.enable();
    this.btnResetRace.disable();
  }

  public handleError(error: Error): void {
    this.popup.showText(error.name, error.message);
  }

  public showFinisher(place: number, car: CarModel): void {
    this.tracks.find((track) => track.carModel === car)?.show(place);
  }

  private getCarTracks() {
    return this.tracks.filter((track) => track.carModel !== null);
  }

  private addCar(car?: Maybe<CarModel>): void {
    if (car) this.tracks.find((track) => track.carModel === null)?.update(car);
  }

  private async submitAddCar(carDTO: REST_API.CarDTO): Promise<void> {
    this.addCar(await this.onRequestAddCar?.(carDTO));
    await this.popup.hide();
  }

  private async submitUpdateCar(carDTO: REST_API.CarDTO): Promise<void> {
    await this.onRequestUpdateCar?.(carDTO);
    await this.popup.hide();
  }

  private async requestGenerateCars(count = GENERATE_COUNT): Promise<void> {
    const cars = await this.onRequestGenerateCars?.(count);
    if (!cars) return;
    cars.forEach((car) => this.addCar(car));
  }

  private async requestRemoveCar(car: Maybe<CarModel>): Promise<void> {
    if (!car || !this.onRequestRemoveCar) return;
    this.selected = null;
    await this.onRequestRemoveCar?.(car);
  }

  private async requestStartCar(car: Maybe<CarModel>): Promise<void> {
    if (!car || !this.onRequestStartCar) return;
    this.btnResetRace.enable();
    await this.onRequestStartCar?.(car);
  }

  private async requestStopCar(car: Maybe<CarModel>): Promise<void> {
    if (!car || !this.onRequestStopCar) return;
    await this.onRequestStopCar?.(car);
  }

  private async requestStartRace(): Promise<void> {
    this.tracks.forEach((track) => track.show());
    this.btnStartRace.disable();
    this.btnRemovePage.disable();
    this.btnResetRace.enable();
    this.getCarTracks().forEach((track) => track.switch(TrackState.DRIVE));
    const cars = await this.onRequestStartRace?.();
    if (!cars || cars.length === 0) return;
    this.btnStartRace.enable();
    this.btnRemovePage.enable();
  }

  private async requestResetRace(): Promise<void> {
    this.tracks.forEach((track) => track.show());
    this.btnStartRace.disable();
    this.btnResetRace.disable();
    this.btnRemovePage.disable();
    this.getCarTracks().forEach((track) => track.switch(TrackState.EMPTY));
    await this.onRequestResetRace?.();
    this.getCarTracks().forEach((track) => track.switch(TrackState.INITIAL));
    this.btnStartRace.enable();
    this.btnRemovePage.enable();
  }
}
