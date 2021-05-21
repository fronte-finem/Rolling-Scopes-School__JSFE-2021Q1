import styles from './select-view.scss';
import { ICreateViewOptions, View } from '../../shared/views/view';
import { Factory } from '../../shared/views/view-factory';
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
  readonly label: View = Factory.view({
    tag: 'label',
    classNames: [styles.selectLabel],
  });

  readonly select: View = Factory.view({
    tag: 'select',
    classNames: [styles.selector],
  });

  readonly placeholder: View = SelectView.createOption({
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

  static createOption({ value, text, selected, disabled }: ISelectOpionModelState): View {
    const option = Factory.view({ tag: 'option', classNames: [styles.option] });
    option.element.setAttribute('value', value);
    option.setText(text);
    if (selected) option.element.setAttribute('selected', 'selected');
    if (disabled) option.element.setAttribute('disabled', 'disabled');
    return option;
  }

  onSelect(
    listener: (value: string) => void,
    // listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void {
    const select = this.select.element as HTMLSelectElement;
    const handler = () => listener(select.value);
    select.addEventListener('input', handler, options);
  }
}
