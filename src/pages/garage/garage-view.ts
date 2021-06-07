import { ButtonView } from 'components/button';
import { CAR_EMPTY_ID, CarModel, CarState } from 'components/car';
import { CarInputView } from 'components/car-input';
import { TrackState, TrackView } from 'components/track';
import { PageView } from 'pages/base-page';
import { REST_API } from 'services/rest-api';
import { createElement } from 'shared/dom-utils';
import { Observer } from 'shared/observer';
import { Try } from 'shared/types';

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
  private btnStartRace = new ButtonView(CarageButtons.RACE);
  private btnResetRace = new ButtonView(CarageButtons.RESET);
  private tracks = Array.from(
    { length: REST_API.GARAGE_PAGE_LIMIT_DEFAULT },
    () => new TrackView()
  );

  private carsMap!: Map<number, CarModel>;

  public constructor() {
    super(GARAGE, GAGRAGE_CSS_CLASS.garage);
    this.init();
  }

  protected init(): void {
    this.content.append(this.inputAdd.getRoot(), this.inputUpdate.getRoot());
    this.content.append(this.btnGenerate.getRoot());
    this.content.append(this.btnStartRace.getRoot(), this.btnResetRace.getRoot());
    const tracksList = createElement('tracks', { tag: 'ul' });
    tracksList.append(...this.tracks.map((track) => track.getRoot()));
    this.content.append(tracksList);
    this.bindRequests();
    this.bindTracks();
  }

  private bindRequests() {
    this.hookRequestPage((num) => this.requestGaragePage(num));
    this.inputAdd.onSubmit((car) => this.requestCreateCar(car));
    this.inputUpdate.onSubmit((car) => this.requestUpdateCar(car));
    this.inputUpdate.disable();
    this.btnGenerate.onClick(() => this.requestGenerateCars());
    this.btnStartRace.onClick(() => this.startRace());
    this.btnResetRace.onClick(() => this.resetRace());
  }

  private bindTracks(): void {
    this.tracks.forEach((track) => {
      track.onSelect((id) => this.selectCar(id));
      track.onRemove((id) => this.requestRemoveCar(id));
      track.onStart((id) => this.requestStartCar(id));
      track.onStop((id) => this.requestStopCar(id));
      track.switchButtons();
    });
  }

  public update(model: GarageModel): void {
    super.updatePage(model);
    this.carsMap = new Map<number, CarModel>();
    this.tracks.forEach((track, i) => {
      const car = model.cars[i];
      track.update(car);
      if (car) this.carsMap.set(car.id, car);
    });
  }

  public onRequestGaragePage(listener: (num?: number) => Promise<void>): void {
    this.observer.addListener(GarageViewEvent.GARAGE, listener);
  }

  public async requestGaragePage(num: number): Promise<void> {
    await this.resetRace();
    this.observer.notify(GarageViewEvent.GARAGE, num);
  }

  public updateGaragePage(maybeModel: Try<GarageModel>): void {
    if (!maybeModel) return;
    if (maybeModel instanceof Error) {
      this.popup?.update(`${maybeModel.name}: ${maybeModel.message}`);
      return;
    }
    this.update(maybeModel);
  }

  public selectCar(id: number): void {
    this.inputUpdate.enable();
    this.inputUpdate.update(this.carsMap.get(id) as CarModel);
  }

  private requestGenerateCars(count = GENERATE_COUNT): void {
    this.observer.notify<number>(GarageViewEvent.GENERATE, count);
  }

  public onRequestGenerateCars(listener: (count: number) => void): void {
    this.observer.addListener(GarageViewEvent.GENERATE, listener);
  }

  private requestCreateCar(car: CarModel): void {
    this.observer.notify(GarageViewEvent.ADD, car);
  }

  public onRequestCreateCar(listener: (car: CarModel) => void): void {
    this.observer.addListener(GarageViewEvent.ADD, listener);
  }

  private requestUpdateCar(car: CarModel): void {
    this.observer.notify(GarageViewEvent.UPDATE, car);
  }

  public onRequestUpdateCar(listener: (car: CarModel) => void): void {
    this.observer.addListener(GarageViewEvent.UPDATE, listener);
  }

  private requestRemoveCar(id: number): void {
    if (id === this.inputUpdate.getId()) this.inputUpdate.reset();
    this.observer.notify(GarageViewEvent.REMOVE, id);
  }

  public onRequestRemoveCar(listener: (id: number) => void): void {
    this.observer.addListener(GarageViewEvent.REMOVE, listener);
  }

  public onRequestStartCar!: (id: number) => Promise<Try<REST_API.IDriveParams>>;

  private async requestStartCar(id: number): Promise<void> {
    const maybeParams = await this.onRequestStartCar(id);
    if (!maybeParams) return;
    if (maybeParams instanceof Error) return;
    if (maybeParams) {
      this.moveCar(id, maybeParams);
      await this.requestDriveCar(id);
    }
  }

  public onRequestStopCar!: (id: number) => Promise<Try<REST_API.IDriveParams>>;

  private async requestStopCar(id: number): Promise<void> {
    const maybeParams = await this.onRequestStopCar(id);
    if (!maybeParams) return;
    if (maybeParams instanceof Error) return;
    if (maybeParams) this.stopCar(id);
  }

  public onRequestDriveCar!: (id: number) => Promise<Try<REST_API.IDriveResult>>;

  private async requestDriveCar(id: number): Promise<void> {
    const maybeResult = await this.onRequestDriveCar(id);
    if (!maybeResult) return;
    if (maybeResult instanceof REST_API.EngineError) {
      this.pauseCar(id);
    }
  }

  public moveCar(id: number, raceParams: REST_API.IDriveParams): void {
    this.carsMap.get(id)?.move(raceParams);
  }

  public stopCar(id: number): void {
    this.carsMap.get(id)?.reset();
  }

  public pauseCar(id: number): void {
    this.carsMap.get(id)?.pause();
  }

  public async resetRace(): Promise<void> {
    if (!this.carsMap) return;
    this.btnStartRace.disable();
    this.btnResetRace.disable();
    this.getCarTracks().forEach((track) => track.switchButtons(TrackState.EMPTY));
    await Promise.all(
      [...this.carsMap.values()]
        .filter((car) => car.state !== CarState.INITIAL)
        .map((car) => this.requestStopCar(car.id))
    );
    this.getCarTracks().forEach((track) => track.switchButtons(TrackState.INITIAL));
    this.btnStartRace.enable();
    this.btnResetRace.enable();
  }

  public async startRace(): Promise<void> {
    await this.resetRace();
    this.btnStartRace.disable();
    this.getCarTracks().forEach((track) => track.switchButtons(TrackState.DRIVE));
    await Promise.all([...this.carsMap.keys()].map((id) => this.requestStartCar(id)));
    this.btnStartRace.enable();
  }

  private getCarTracks() {
    return this.tracks.filter((track) => track.carID !== CAR_EMPTY_ID);
  }
}
