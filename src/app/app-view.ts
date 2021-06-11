import { ButtonView } from 'components/button';
import { ModalView } from 'components/modal';
import { PopupView } from 'components/popup';
import { GarageView } from 'pages/garage';
import { WinnersView } from 'pages/winners/winners-view';
import { createElement } from 'shared/dom-utils';
import { View } from 'shared/view';

import { APP_CSS_CLASS } from './app.css';
import { AppRoute } from './app-config';

export class AppView extends View {
  private btnToGarage = new ButtonView(AppRoute.GARAGE);
  private btnToWinners = new ButtonView(AppRoute.WINNERS);
  private wrapper = createElement('wrapper');
  private modal = new ModalView();
  private popup = new PopupView(this.modal);

  public constructor(
    route: AppRoute,
    private garageView: GarageView,
    private winnersView: WinnersView
  ) {
    super(APP_CSS_CLASS.app);
    this.init();
    this.update(route);
  }

  protected init(): void {
    this.garageView.setPopup(this.popup);
    this.winnersView.setPopup(this.popup);
    this.btnToGarage.onClick(() => this.update(AppRoute.GARAGE));
    this.btnToWinners.onClick(() => this.update(AppRoute.WINNERS));
    this.root.append(this.btnToGarage.getRoot(), this.btnToWinners.getRoot(), this.wrapper);
    this.wrapper.append(this.garageView.getRoot(), this.winnersView.getRoot());
    this.root.append(this.modal.getRoot(), this.popup.getRoot());
  }

  public update(route: AppRoute): void {
    switch (route) {
      case AppRoute.GARAGE:
        this.winnersView.hide();
        this.garageView.show();
        break;
      case AppRoute.WINNERS:
        this.garageView.hide();
        this.winnersView.show();
        break;
      default:
        break;
    }
  }
}
