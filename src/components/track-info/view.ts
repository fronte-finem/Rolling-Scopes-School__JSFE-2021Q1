import { CarModel } from 'components/car';
import { createElement } from 'shared/dom-utils';
import { Maybe } from 'shared/types';
import { View } from 'shared/view';

import styles from './style.module.scss';

export class TrackInfoView extends View {
  private place = createElement(styles.place, { tag: 'span' });
  private time = createElement(styles.time, { tag: 'span' });
  private name = createElement(styles.name, { tag: 'span' });

  public constructor(className: string) {
    super([styles.info, className]);
    this.build();
  }

  private build(): void {
    this.root.append(this.place, this.time, this.name);
  }

  public reset(car: Maybe<CarModel>): void {
    this.place.textContent = '';
    this.time.textContent = '';
    this.name.textContent = car?.name || '';
  }

  public update(place: number, car: CarModel): void {
    this.place.textContent = `${place}`;
    this.time.textContent = `${car.time}s`;
    this.name.textContent = car.name;
  }
}
