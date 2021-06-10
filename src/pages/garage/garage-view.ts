import { ButtonView } from 'components/button';
import { CarModel } from 'components/car';
import { CarInputView } from 'components/car-input';
import { TrackState, TrackView } from 'components/track';
import { PageView } from 'pages/base-page';
import { REST_API } from 'services/rest-api';
import { createElement } from 'shared/dom-utils';
import { Observer } from 'shared/observer';

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

export class GarageView extends PageView<GarageModel> {
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

  public constructor() {
    super(GARAGE, GAGRAGE_CSS_CLASS.garage);
    this.init();
  }

  protected init(): void {
    this.content.append(this.inputAdd.getRoot(), this.inputUpdate.getRoot());
    this.content.append(this.btnGenerate.getRoot(), this.btnRemovePage.getRoot());
    this.content.append(this.btnStartRace.getRoot(), this.btnResetRace.getRoot());
    this.tracks.forEach((track) => this.tracksList.appendChild(track.getRoot()));
    this.content.append(this.tracksList);
    this.initBinds();
  }

  private initBinds() {
    this.inputAdd.onSubmit((car) => this.requestAddCar(car));
    this.inputUpdate.onSubmit((car) => this.requestUpdateCar(car));
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

  public update(model: GarageModel): void {
    this.tracks.forEach((track, i) => track.update(model.cars[i]));
  }

  public updateCars(cars: CarModel[]): void {
    this.tracks.forEach((track, i) => track.update(cars[i]));
  }

  public handleError(error: Error): void {
    this.popup?.update(`${error.name}: ${error.message}`);
  }

  public selectCar(car: CarModel): void {
    this.inputUpdate.enable();
    this.inputUpdate.update(car);
  }

  private requestGenerateCars(count = GENERATE_COUNT): void {
    this.observer.notify<number>(GarageViewEvent.GENERATE, count);
  }

  public onRequestGenerateCars(listener: (count: number) => void): void {
    this.observer.addListener(GarageViewEvent.GENERATE, listener);
  }

  private requestRemovePage(): void {
    this.observer.notify(GarageViewEvent.REMOVE_PAGE, null);
  }

  public onRequestRemovePage(listener: () => void): void {
    this.observer.addListener(GarageViewEvent.REMOVE_PAGE, listener);
  }

  public onRequestAddCar(listener: (car: CarModel) => void): void {
    this.observer.addListener(GarageViewEvent.ADD, listener);
  }

  private requestAddCar(car: CarModel): void {
    this.observer.notify(GarageViewEvent.ADD, car);
  }

  public addCar(car: CarModel): void {
    this.tracks.find((track) => track.car === null)?.update(car);
  }

  public onRequestRemoveCar(listener: (car: CarModel) => void): void {
    this.observer.addListener(GarageViewEvent.REMOVE, listener);
  }

  private requestRemoveCar(car: CarModel): void {
    if (car.id === this.inputUpdate.getId()) this.inputUpdate.reset();
    this.observer.notify(GarageViewEvent.REMOVE, car);
  }

  public removeCar(car: CarModel): void {
    const maybeTrack = this.tracks.find((t) => t.car === car);
    if (!maybeTrack) return;
    this.tracks = this.tracks.filter((t) => t !== maybeTrack);
    maybeTrack.reset();
    this.tracksList.removeChild(maybeTrack.getRoot());
    const newTrack = new TrackView();
    this.tracks.push(newTrack);
    this.tracksList.appendChild(newTrack.getRoot());
    this.bindTrack(newTrack);
  }

  private requestUpdateCar(car: CarModel): void {
    this.observer.notify(GarageViewEvent.UPDATE, car);
  }

  public onRequestUpdateCar(listener: (car: CarModel) => void): void {
    this.observer.addListener(GarageViewEvent.UPDATE, listener);
  }

  public onRequestStartCar(listener: (car: CarModel) => void): void {
    this.observer.addListener(GarageViewEvent.START, listener);
  }

  private requestStartCar(car: CarModel): void {
    this.observer.notify(GarageViewEvent.START, car);
  }

  public onRequestStopCar(listener: (car: CarModel) => void): void {
    this.observer.addListener(GarageViewEvent.STOP, listener);
  }

  private requestStopCar(car: CarModel): void {
    this.observer.notify(GarageViewEvent.STOP, car);
  }

  public onRequestStartRace!: () => Promise<void>;

  private async requestStartRace(): Promise<void> {
    this.btnStartRace.disable();
    this.getCarTracks().forEach((track) => track.switchButtons(TrackState.DRIVE));
    await this.onRequestStartRace();
    this.btnStartRace.enable();
  }

  public onRequestResetRace!: () => Promise<void>;

  private async requestResetRace(): Promise<void> {
    this.btnStartRace.disable();
    this.btnResetRace.disable();
    this.getCarTracks().forEach((track) => track.switchButtons(TrackState.EMPTY));
    await this.onRequestResetRace();
    this.getCarTracks().forEach((track) => track.switchButtons(TrackState.INITIAL));
    this.btnStartRace.enable();
    this.btnResetRace.enable();
  }

  private getCarTracks() {
    return this.tracks.filter((track) => track.car !== null);
  }

  public showWinner(car: CarModel): void {
    this.popup?.update(`Winner: ${car.name}!`);
  }

  public showFinishers(cars: CarModel[]): void {
    this.popup?.update(`Finishers:\n ${cars.map((car, i) => `${i + 1}) ${car.name}`).join('\n')}!`);
  }
}
