import { ICreateViewOptions, View } from '../shared/views/view';

import styles from './base-page.scss';

export interface IPage {
  readonly view: View;
  init(url?: string): void;
  stop(): void;
}

export abstract class BasePage implements IPage {
  public readonly view: View;

  public constructor({ classNames = [], ...options }: ICreateViewOptions) {
    this.view = new View({
      ...options,
      classNames: [styles.page, ...classNames],
    });
  }

  public abstract init(url?: string): void | Promise<void>;

  public abstract stop(): void | Promise<void>;
}
