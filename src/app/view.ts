import { ButtonView } from 'components/button';
import { ButtonType } from 'components/button/config';
import { ModalView } from 'components/modal';
import { PopupView } from 'components/popup';
import { AboutView } from 'pages/about';
import { GarageController, GarageModel, GarageView } from 'pages/garage';
import { WinnersController, WinnersModel, WinnersView } from 'pages/winners';
import { CarsService, RaceService } from 'services/race';
import { createElement, htmlToElem } from 'shared/dom-utils';
import { View } from 'shared/view';
import { IShow } from 'shared/view-types';

import { AppRoute, FOOTER } from './config';
import styles from './style.module.scss';

export class AppView extends View {
  private btnToAbout = new ButtonView(AppRoute.ABOUT, ButtonType.ROUTE, styles.btn);
  private btnToGarage = new ButtonView(AppRoute.GARAGE, ButtonType.ROUTE, styles.btn);
  private btnToWinners = new ButtonView(AppRoute.WINNERS, ButtonType.ROUTE, styles.btn);
  private aboutView = new AboutView();
  private carsController!: GarageController;
  private winsController!: WinnersController;

  public constructor(route = AppRoute.ABOUT) {
    super(styles.app);
    this.build();
    this.init();
    this.update(route);
  }

  private build() {
    const modal = new ModalView();
    const popup = new PopupView(modal);

    const carsModel = new GarageModel();
    const winsModel = new WinnersModel();

    const carsView = new GarageView(carsModel, popup);
    const winsView = new WinnersView(winsModel, popup);

    const carsService = new CarsService(carsModel, winsModel);
    const raceService = new RaceService(carsModel, winsModel);

    this.carsController = new GarageController(carsModel, carsView, carsService, raceService);
    this.winsController = new WinnersController(winsModel, winsView, carsService, raceService);

    const header = createElement(styles.header, { tag: 'header' });
    const wrapper = createElement(styles.wrapper);
    header.append(
      this.btnToAbout.getRoot(),
      this.btnToGarage.getRoot(),
      this.btnToWinners.getRoot()
    );
    wrapper.append(this.aboutView.getRoot(), carsView.getRoot(), winsView.getRoot());
    this.root.append(header, wrapper, htmlToElem(FOOTER));
    this.root.append(modal.getRoot(), popup.getRoot());
  }

  protected init(): void {
    this.btnToAbout.onClick(() => this.update(AppRoute.ABOUT));
    this.btnToGarage.onClick(() => this.update(AppRoute.GARAGE));
    this.btnToWinners.onClick(() => this.update(AppRoute.WINNERS));
    this.carsController.view.onPageUpdated((title) => this.btnToGarage.update(title));
    this.winsController.view.onPageUpdated((title) => this.btnToWinners.update(title));
  }

  public async start(): Promise<void> {
    await this.carsController.init();
    await this.winsController.init();
  }

  public update(route: AppRoute): void {
    switch (route) {
      case AppRoute.ABOUT:
        this.activate(this.aboutView, this.btnToAbout);
        break;
      case AppRoute.GARAGE:
        this.activate(this.carsController.view, this.btnToGarage);
        break;
      case AppRoute.WINNERS:
        this.activate(this.winsController.view, this.btnToWinners);
        break;
      default:
        break;
    }
  }

  private get routerBtns(): ButtonView[] {
    return [this.btnToAbout, this.btnToGarage, this.btnToWinners];
  }

  private get routerPages(): IShow[] {
    return [this.aboutView, this.carsController.view, this.winsController.view];
  }

  private activate(pageToActivate: IShow, btnToActivate: ButtonView): void {
    pageToActivate.show();
    btnToActivate.setCssState(styles.active, true);
    this.routerPages
      .filter((page) => page !== pageToActivate)
      .forEach((page) => page.hide());
    this.routerBtns
      .filter((btn) => btn !== btnToActivate)
      .forEach((btn) => btn.setCssState(styles.active, false));
  }
}
