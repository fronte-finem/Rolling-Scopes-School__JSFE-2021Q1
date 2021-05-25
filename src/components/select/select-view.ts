import styles from './select-view.scss';
import { ICreateViewOptions, View } from '../../shared/views/view';
import { ISelectOpionModelState } from './select-model';

export interface ISelectOption {
  value: string;
  text: string;
}
export interface ICreateSelectOptions extends ICreateViewOptions {
  heading: string;
  placeholder: string;
}

export class SelectView extends View {
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

  addOptions(opts: ISelectOpionModelState[]): SelectView {
    this.select.render([
      this.placeholder,
      ...opts.map((opt) => SelectView.createOption(opt)),
    ]);
    return this;
  }

  static createOption({
    value,
    text,
    selected,
    disabled,
    title,
  }: ISelectOpionModelState): View<HTMLOptionElement> {
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
    listener: (value: string) => void,
    options?: boolean | AddEventListenerOptions
  ): void {
    const select: HTMLSelectElement = this.select.element;
    const handler = () => listener(select.value);
    select.addEventListener('input', handler, options);
  }
}
