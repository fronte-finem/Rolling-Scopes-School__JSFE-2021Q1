import { replaceSpaces } from '../shared/string-utils';
import View from '../shared/views/view';
import Factory, { IBuildViewOptions } from '../shared/views/view-factory';
import style from './base-page.scss'

export interface IPage {
  readonly view: View;
  readonly titleText: string;
  readonly titleSafe: string;
  readonly url: string;
}

export default abstract class BasePage implements IPage {
  private readonly title: string;

  readonly view: View;

  constructor(title: string, { styles, ...options }: IBuildViewOptions) {
    this.title = title.toLowerCase();
    this.view = Factory.view({ styles: [style.page].concat(styles || []), ...options });
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
