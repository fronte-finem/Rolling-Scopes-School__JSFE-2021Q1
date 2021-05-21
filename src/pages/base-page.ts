import { View } from '../shared/views/view';
import { Factory, IBuildViewOptions } from '../shared/views/view-factory';
import styles from './base-page.scss';

export interface IPage {
  readonly view: View;
  init(): void;
  stop(): void;
}

export abstract class BasePage implements IPage {
  readonly view: View;

  constructor({ classNames, ...options }: IBuildViewOptions) {
    this.view = Factory.view({
      classNames: [styles.page].concat(classNames || []),
      ...options,
    });
  }

  init(): void {
    console.log(this, '⚠️ Method INIT not implemented ⚠️');
  }

  stop(): void {
    console.log(this, '⚠️ Method STOP not implemented ⚠️');
  }
}
