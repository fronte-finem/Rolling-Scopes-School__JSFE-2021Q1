import { ICreateViewOptions, View } from '../../shared/views/view';
import styles from './select-view.scss';

export interface ICreateOptionOptions<T> extends ICreateViewOptions {
  value: T;
  selected?: boolean;
  disabled?: boolean;
  title?: string;
}

export class OptionView<
  T extends string = string
> extends View<HTMLOptionElement> {
  public value: T;

  public constructor(options: ICreateOptionOptions<T>) {
    super({
      ...options,
      tag: 'option',
      classNames: [styles.option].concat(options.classNames || []),
    });
    this.value = options.value;
    this.init(options);
  }

  private init({
    value,
    selected,
    disabled,
    title,
  }: ICreateOptionOptions<T>): void {
    this.element.setAttribute('value', value);
    if (selected) this.element.selected = true;
    if (disabled) this.element.disabled = true;
    if (title) this.element.title = title;
  }
}
