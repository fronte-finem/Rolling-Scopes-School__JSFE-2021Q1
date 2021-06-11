import { ButtonView } from 'components/button';
import { CarModel } from 'components/car';
import { CarInputView } from 'components/car-input';
import { TrackState, TrackView } from 'components/track';
import { PageView } from 'pages/base-page';
import { REST_API } from 'services/rest-api';
import { createElement } from 'shared/dom-utils';
import { Observer } from 'shared/observer';
import { Maybe } from 'shared/types';

import { GAGRAGE_CSS_CLASS } from './garage.css';
import { CarageButtons, GARAGE, GarageViewEvent, GENERATE_COUNT } from './garage-config';
import { GarageModel } from './garage-model';

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
  private observer = new Observer<GarageViewEvent>();
  private inputAdd = new CarInputView(CarageButtons.ADD);
  private inputUpdate = new CarInputView(CarageButtons.UPDATE);
  private btnGenerate = new ButtonView(CarageButtons.GENERATE);
  private btnRemovePage = new ButtonView(CarageButtons.REMOVE_PAGE);
  private btnStartRace = new ButtonView(CarageButtons.RACE);
  private btnResetRace = new ButtonView(CarageButtons.RESET);
  private tracksList = createElement('tracks');
  private tracks = Array.from(
    { length: REST_API.GARAGE_PAGE_LIMIT_DEFAULT },
    () => new TrackView()
  );

  public onRequestAddCar?: (carDTO: REST_API.CarDTO) => Promise<Maybe<CarModel>>;
  public onRequestUpdateCar?: (carDTO: REST_API.CarDTO) => Promise<void>;
  public onRequestRemoveCar?: (car: CarModel) => Promise<void>;
  public onRequestRemovePage?: () => Promise<void>;
  public onRequestGenerateCars?: (count: number) => Promise<void>;
  public onRequestStartCar?: (car: CarModel) => Promise<void>;
  public onRequestStopCar?: (car: CarModel) => Promise<void>;
  public onRequestStartRace?: () => Promise<CarModel[]>;
  public onRequestResetRace?: () => Promise<void>;

  public constructor(model: GarageModel) {
    super(model, GARAGE, GAGRAGE_CSS_CLASS.garage);
    this.initGarage(model);
  }

  private initGarage(model: GarageModel): void {
    this.content.append(this.inputAdd.getRoot(), this.inputUpdate.getRoot());
    this.content.append(this.btnGenerate.getRoot(), this.btnRemovePage.getRoot());
    this.content.append(this.btnStartRace.getRoot(), this.btnResetRace.getRoot());
    this.tracks.forEach((track) => this.tracksList.appendChild(track.getRoot()));
    this.content.append(this.tracksList);
    this.tracks.forEach((track, i) => track.update(model.cars[i]));
    this.initBinds();
  }

  private initBinds() {
    this.inputAdd.onSubmit((carDTO) => this.requestAddCar(carDTO));
    this.inputUpdate.onSubmit((carDTO) => this.requestUpdateCar(carDTO));
    this.inputUpdate.disable();
    this.btnGenerate.onClick(() => this.requestGenerateCars());
    this.btnRemovePage.onClick(() => this.requestRemovePage());
    this.btnStartRace.onClick(() => this.requestStartRace());
    this.btnResetRace.onClick(() => this.requestResetRace());
    this.tracks.forEach((track) => this.bindTrack(track));
  }

  private bindTrack(track: TrackView): void {
    track.onSelect((car) => car && this.selectCar(car));
    track.onRemove((car) => car && this.requestRemoveCar(car));
    track.onStart((car) => car && this.requestStartCar(car));
    track.onStop((car) => car && this.requestStopCar(car));
    track.switchButtons();
  }

  protected hookRequestPage = (): void => {
    this.inputUpdate.reset();
  };

  public updateCars(cars: CarModel[]): void {
    this.tracks.forEach((track, i) => track.update(cars[i]));
  }

  public handleError(error: Error): void {
    this.popup(`${error.name}: ${error.message}`);
  }

  public showWinner(car: CarModel): void {
    this.popup(`Winner: ${car.name}!`);
  }

  public selectCar(car: CarModel): void {
    this.inputUpdate.enable();
    this.inputUpdate.update(car);
  }

  private getCarTracks() {
    return this.tracks.filter((track) => track.carModel !== null);
  }

  private async requestGenerateCars(count = GENERATE_COUNT): Promise<void> {
    await this.onRequestGenerateCars?.(count);
  }

  private async requestRemovePage(): Promise<void> {
    await this.onRequestRemovePage?.();
  }

  private async requestAddCar(carDTO: REST_API.CarDTO): Promise<void> {
    const car = await this.onRequestAddCar?.(carDTO);
    if (car) this.tracks.find((track) => track.carModel === null)?.update(car);
  }

  private async requestRemoveCar(car: CarModel): Promise<void> {
    if (car.id === this.inputUpdate.getId()) this.inputUpdate.reset();
    await this.onRequestRemoveCar?.(car);
  }

  private async requestUpdateCar(carDTO: REST_API.CarDTO): Promise<void> {
    await this.onRequestUpdateCar?.(carDTO);
  }

  private async requestStartCar(car: CarModel): Promise<void> {
    await this.onRequestStartCar?.(car);
  }

  private async requestStopCar(car: CarModel): Promise<void> {
    await this.onRequestStopCar?.(car);
  }

  private async requestStartRace(): Promise<void> {
    this.btnStartRace.disable();
    this.btnRemovePage.disable();
    const cars = await this.onRequestStartRace?.();
    if (!cars || cars.length === 0) return;
    this.btnStartRace.enable();
    this.btnRemovePage.enable();
    this.popup(`Finishers:\n ${cars.map((car, i) => `${i + 1}) ${car.name}`).join('\n')}!`);
  }

  private async requestResetRace(): Promise<void> {
    this.btnStartRace.disable();
    this.btnResetRace.disable();
    this.btnRemovePage.disable();
    this.getCarTracks().forEach((track) => track.switchButtons(TrackState.EMPTY));
    await this.onRequestResetRace?.();
    this.getCarTracks().forEach((track) => track.switchButtons(TrackState.INITIAL));
    this.btnStartRace.enable();
    this.btnResetRace.enable();
    this.btnRemovePage.enable();
  }
}
