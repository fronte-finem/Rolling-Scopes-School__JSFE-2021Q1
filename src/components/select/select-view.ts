import { ICreateViewOptions, View } from 'shared/views/view';

import { OptionView } from './option-view';

import styles from './select-view.scss';

export interface ICreateSelectOptions<T> extends ICreateViewOptions {
  title: string;
  values: ReadonlyMap<T, string>;
}

export class SelectView<T extends string = string> extends View {
  private readonly optionsMap = new Map<string, OptionView<T>>();

  private readonly title = new View<HTMLLabelElement>({
    tag: 'label',
    classNames: [styles.title],
  });

  private readonly selector = new View<HTMLSelectElement>({
    tag: 'select',
    classNames: [styles.selector],
  });

  private readonly placeholder = new OptionView({
    value: 'placeholder',
    text: 'placeholder',
    selected: true,
    disabled: true,
  });

  public constructor({ classNames = [], ...options }: ICreateSelectOptions<T>) {
    super({ ...options, classNames: [...classNames, styles.selectContainer] });
    this.init(options);
  }

  private init({ title, values }: ICreateSelectOptions<T>): void {
    this.render([this.title, this.selector]);
    this.title.setText(title);
    this.placeholder.setText(title);
    this.selector.element.add(this.placeholder.element);
    this.initOptions(values);
  }

  private initOptions(opts: ReadonlyMap<T, string>): void {
    [...opts.entries()].forEach(([value, text]) => {
      const optionView = new OptionView({ value, text });
      this.optionsMap.set(optionView.element.value, optionView);
      this.selector.element.add(optionView.element);
    });
  }

  public setValue(value: T): void {
    this.selector.element.selectedIndex = -1;
    this.optionsMap.get(value)?.selected();
  }

  public onSelect(
    listener: (value: T) => void,
    options?: boolean | AddEventListenerOptions
  ): void {
    const select: HTMLSelectElement = this.selector.element;
    const handler = () =>
      listener(this.optionsMap.get(select.value)?.value as T);
    select.addEventListener('input', handler, options);
  }
}
