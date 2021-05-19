import { capitalize, replaceSpaces } from '../shared/string-utils';
import { View } from '../shared/views/view';
import { Factory, IBuildViewOptions } from '../shared/views/view-factory';
import styles from './base-page.scss';

export interface IPage {
  readonly view: View;
  readonly titleText: string;
  readonly titleSafe: string;
  readonly url: string;
  init(): void;
  stop(): void;
}

export abstract class BasePage implements IPage {
  private readonly title: string;

  readonly view: View;

  constructor(title: string, { classNames, ...options }: IBuildViewOptions) {
    this.title = title.toLowerCase();
    this.view = Factory.view({
      classNames: [styles.page].concat(classNames || []),
      ...options,
    });
  }

  init(): void {
    document.title = `🎴 Match-Match 🃏 ${capitalize(this.titleText)} 🎴`;
  }

  stop(): void {
    console.log(this, '⚠️ Method stop not implemented ⚠️');
  }

  get titleText(): string {
    return this.title;
  }

  get titleSafe(): string {
    return replaceSpaces(this.title);
  }

  get url(): string {
    return `#/${this.titleSafe}`;
  }
}
