import { IRoute } from '../../router/router';
import { IBtnConfig } from './buttons';
import { BtnTypeInput } from './inputs';
import { IPopUpConfig } from './popups';

export interface IBtnInputConfig {
  readonly title: string;
  readonly type: BtnTypeInput;
}

export interface IHeaderConfig {
  readonly btns: Record<string, IBtnConfig>;
}

export interface IPageConfig {
  readonly route: IRoute;
  readonly navSvgIcon?: string;
}

export interface IAppConfig {
  readonly initialRoute: IRoute;
  readonly header: IHeaderConfig;
  readonly pages: Record<string, IPageConfig>;
  readonly popups: Record<string, IPopUpConfig<string, string>>;
}
