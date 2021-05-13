import { IView } from '../shared/types';
import View from '../shared/view';
import { capitalize, replaceSpaces } from '../shared/string-utils';

export interface IPageView extends IView {
  readonly titleText: string;
  readonly titleSafe: string;
  readonly titleUrl: string;
}

export default abstract class BasePage extends View implements IPageView {
  constructor(private readonly title: string) {
    super({
      tag: 'h1',
      styles: ['page', `page-${replaceSpaces(title)}`],
      text: capitalize(title),
    });
  }

  get titleText(): string {
    return capitalize(this.title);
  }

  get titleSafe(): string {
    return replaceSpaces(this.title);
  }

  get titleUrl(): string {
    return `#/${this.titleSafe}`;
  }
}
