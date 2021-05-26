import styles from './select-view.scss';
import { ICreateViewOptions, View } from '../../shared/views/view';
import { ISelectOpionModelState } from './select-model';

export interface ISelectOption<T> {
  value: T;
  text: string;
}
export interface ICreateSelectOptions extends ICreateViewOptions {
  heading: string;
  placeholder: string;
}

export class SelectView<T extends string = string> extends View {
  private readonly optionsMap = new Map<string, T>();

  readonly label = new View<HTMLLabelElement>({
    tag: 'label',
    classNames: [styles.selectLabel],
  });

  readonly select = new View<HTMLSelectElement>({
    tag: 'select',
    classNames: [styles.selector],
  });

  readonly placeholder = SelectView.createOption({
    value: 'placeholder',
    text: 'placeholder',
    selected: true,
    disabled: true,
  });

  constructor({
    heading,
    placeholder,
    classNames,
    ...options
  }: ICreateSelectOptions) {
    super({
      ...options,
      classNames: [styles.selectContainer].concat(classNames || []),
    });

    this.render([this.label, this.select]);
    this.label.setText(heading);
    this.placeholder.setText(placeholder);
    this.select.render(this.placeholder);
  }

  addOptions(opts: ISelectOpionModelState<T>[]): SelectView {
    opts.forEach((opt) => this.optionsMap.set(opt.value, opt.value));
    this.select.render([
      this.placeholder,
      ...opts.map((opt) => SelectView.createOption(opt)),
    ]);
    return this;
  }

  static createOption<V extends string = string>({
    value,
    text,
    selected,
    disabled,
    title,
  }: ISelectOpionModelState<V>): View<HTMLOptionElement> {
    const option = new View<HTMLOptionElement>({
      tag: 'option',
      classNames: [styles.option],
    });
    option.element.setAttribute('value', value);
    option.setText(text);
    if (selected) option.element.selected = true;
    if (disabled) option.element.disabled = true;
    if (title) option.element.title = title;
    return option;
  }

  onSelect(
    listener: (value: T) => void,
    options?: boolean | AddEventListenerOptions
  ): void {
    const select: HTMLSelectElement = this.select.element;
    const handler = () => listener(this.optionsMap.get(select.value) as T);
    select.addEventListener('input', handler, options);
  }
}
