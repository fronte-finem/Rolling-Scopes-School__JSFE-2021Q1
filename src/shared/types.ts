export interface IBaseState {
  data: string;
}

export interface IBaseModel {
  getState(): IBaseState;
}

export interface IView {
  readonly element: HTMLElement;
  update(state: IBaseState): IView;
  clear(): IView;
  render(childs: IView[]): IView;
}

export interface IBaseController {
  readonly view: IView;
  readonly model: IBaseModel;
  run(): void;
  proxify(model: IBaseModel): IBaseModel;
}

export interface ICreateElementOptions {
  tag?: keyof HTMLElementTagNameMap;
  styles?: string[];
  text?: string;
}

export interface IViewOptions extends ICreateElementOptions {
  childs?: (IViewOptions | IView)[];
}
