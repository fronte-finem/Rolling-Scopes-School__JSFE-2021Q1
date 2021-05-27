import styles from './select-view.scss';
import { ICreateViewOptions, View } from '../../shared/views/view';
import { OptionView } from './option-view';

export interface ICreateSelectOptions extends ICreateViewOptions {
  heading: string;
  placeholder: string;
}

export interface ICreateOptionOptions<T> {
  value: T;
  text: string;
  selected?: boolean;
  disabled?: boolean;
  title?: string;
}

export class SelectView<T extends string = string> extends View {
  private readonly optionsMap = new Map<string, OptionView<T>>();

  private readonly label = new View<HTMLLabelElement>({
    tag: 'label',
    classNames: [styles.selectLabel],
  });

  private readonly select = new View<HTMLSelectElement>({
    tag: 'select',
    classNames: [styles.selector],
  });

  private readonly placeholder = new OptionView({
    value: 'placeholder',
    text: 'placeholder',
    selected: true,
    disabled: true,
  });

  public constructor({ classNames = [], ...options }: ICreateSelectOptions) {
    super({ ...options, classNames: [...classNames, styles.selectContainer] });
    this.init(options);
  }

  private init({ heading, placeholder }: ICreateSelectOptions): void {
    this.render([this.label, this.select]);
    this.label.setText(heading);
    this.placeholder.setText(placeholder);
    this.select.element.add(this.placeholder.element);
  }

  public addOptions(opts: ICreateOptionOptions<T>[]): SelectView {
    opts.forEach((opt) => {
      const optionView = new OptionView(opt);
      this.optionsMap.set(optionView.element.value, optionView);
      this.select.element.add(optionView.element);
    });
    return this;
  }

  public onSelect(
    listener: (value: T) => void,
    options?: boolean | AddEventListenerOptions
  ): void {
    const select: HTMLSelectElement = this.select.element;
    const handler = () =>
      listener(this.optionsMap.get(select.value)?.value as T);
    select.addEventListener('input', handler, options);
  }
}
