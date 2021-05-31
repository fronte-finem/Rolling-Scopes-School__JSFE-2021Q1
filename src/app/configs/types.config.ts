import { View } from 'shared/views/view';

export interface IPage {
  readonly view: View;
  init(url?: string): void;
  stop(): void;
}

export type PageCreator = () => IPage;

export interface IPageConfig {
  readonly route: IRoute;
  readonly navSvgIcon?: string;
}

export interface IRoute {
  readonly url: string;
  readonly title: string;
  readonly pageCreator: PageCreator;
}
