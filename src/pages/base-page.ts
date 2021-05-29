import { View } from '../shared/views/view';
import { Factory, IBuildViewOptions } from '../shared/views/view-factory';

import styles from './base-page.scss';

export interface IPage {
  readonly view: View;
  init(): void;
  stop(): void;
}

export abstract class BasePage implements IPage {
  public readonly view: View;

  public constructor({ classNames = [], ...options }: IBuildViewOptions) {
    this.view = Factory.view({
      classNames: [styles.page, ...classNames],
      ...options,
    });
  }

  public abstract init(): void | Promise<void>;

  public abstract stop(): void | Promise<void>;
}
