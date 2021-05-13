import { createElement } from './dom-utils';
import { IView, IBaseState, ICreateElementOptions } from './types';

export default class View implements IView {
  readonly element: HTMLElement;

  constructor(options: ICreateElementOptions) {
    this.element = createElement(options);
  }

  update(state: IBaseState): IView {
    this.element.textContent = state.data;
    return this;
  }

  clear(): IView {
    this.element.innerHTML = '';
    return this;
  }

  render(childs: IView[]): IView {
    this.clear();
    this.element.append(...childs.map((child) => child.element));
    return this;
  }

  onClick(
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.element.addEventListener('click', listener, options);
  }

  onInput(
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.element.addEventListener('input', listener, options);
  }
}
