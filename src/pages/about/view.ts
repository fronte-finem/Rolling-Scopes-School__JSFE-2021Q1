import { CarModel, CarView } from 'components/car';
import { createElement, htmlToElem } from 'shared/dom-utils';
import { View } from 'shared/view';
import { IShow } from 'shared/view-types';

import bugStyles from '../../components/car/style.module.scss';
import { BLOCKS, RANDOM_CAR_DTO, TO_RUN_STATE } from './config';
import styles from './style.module.scss';

export class AboutView extends View implements IShow {
  public carModel = new CarModel(RANDOM_CAR_DTO, null);
  private carView = new CarView(this.carModel, false, [bugStyles.run, styles.bigBug]);
  private bugLayer = createElement(styles.bugLayer);

  public constructor() {
    super(styles.root);
    this.build();
    this.init();
  }

  private build(): void {
    const content = createElement(styles.content);
    const title = htmlToElem(BLOCKS.title);
    const greet = htmlToElem(BLOCKS.greet);
    const remind = htmlToElem(BLOCKS.remind);
    const features = htmlToElem(BLOCKS.features);
    content.append(greet, remind, features);
    this.bugLayer.append(this.carView.getRoot());
    this.root.append(title, content, this.bugLayer);
  }

  private init(): void {
    this.carModel.onUpdate = (car) => this.carView.update(car);
    this.carModel.onDrive = (car) => this.carView.applyCarModelState(car);
    this.carView.setCssState(bugStyles.run, true);
    TO_RUN_STATE.forEach(([cssvar, value]) => {
      this.carView.setCssVar(cssvar, value);
    });
  }

  public show(): void {
    this.setCssState(styles.hidden, false);
  }

  public hide(): void {
    this.setCssState(styles.hidden, true);
  }
}
