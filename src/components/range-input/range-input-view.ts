import { IEquality, IToString } from '../../shared/models/types';
import { ICreateViewOptions, View } from '../../shared/views/view';
import { OptionView } from '../select/option-view';

import styles from './range-input-view.scss';

export interface ICreateInputRangeOptions<T> extends ICreateViewOptions {
  readonly title: string;
  readonly values: ReadonlyArray<T>;
  readonly value?: T;
}

type RangeValue = number | string | (IToString & IEquality);

export class InputRangeView<T extends RangeValue> extends View {
  private static id = 0;

  private getId = () => {
    InputRangeView.id += 1;
    return `input-range-view-${InputRangeView.id}`;
  };

  private values: ReadonlyArray<T> = [];

  private readonly title = new View<HTMLLabelElement>({
    tag: 'label',
    classNames: [styles.title],
  });

  private readonly input = new View<HTMLInputElement>({
    tag: 'input',
    classNames: [styles.input],
  });

  private readonly output = new View<HTMLOutputElement>({
    tag: 'output',
    classNames: [styles.output],
  });

  private readonly datalist = new View<HTMLDataListElement>({
    tag: 'datalist',
    classNames: [styles.datalist],
  });

  public constructor({
    classNames = [],
    ...options
  }: ICreateInputRangeOptions<T>) {
    super({ ...options, classNames: [...classNames, styles.inputRange] });
    this.init(options);
  }

  private init({ title, values, value }: ICreateInputRangeOptions<T>): void {
    this.title.setText(title);
    this.initValues(values);
    this.initInput(value);
    this.initDatalist();
    this.initOutput();
    this.render([
      this.title,
      new View({ classNames: [styles.wrapper] }).render([
        this.input,
        this.datalist,
      ]),
      this.output,
    ]);
  }

  private initValues(values: ReadonlyArray<T>): void {
    this.values = values;
  }

  private initInput(value?: T): void {
    this.input.element.type = 'range';
    this.input.element.min = String(0);
    this.input.element.max = String(this.values.length - 1);
    this.input.element.step = String(1);
    this.setInputValue(value);
  }

  private initDatalist(): void {
    this.datalist.element.id = this.getId();
    this.input.element.setAttribute('list', this.datalist.element.id);
    this.datalist.render(
      this.values.map(
        (_, i) =>
          new OptionView({ value: String(i), classNames: [styles.option] })
      )
    );
  }

  private initOutput(): void {
    this.setOutputValue();
    this.onSelect((value: T) => {
      this.output.element.value = value.toString();
    });
  }

  public onSelect(listener: (value: T) => void): void {
    this.input.element.addEventListener('input', () =>
      listener(this.getValue())
    );
  }

  private getValue(): T {
    const i = Number(this.input.element.value);
    return this.values[i];
  }

  public setValue(value?: T): void {
    this.setInputValue(value);
    this.setOutputValue();
  }

  private setInputValue(value?: T): void {
    let i: number;
    if (!value) {
      this.input.element.value = '0';
      return;
    }
    if (typeof value === 'string' || typeof value === 'number') {
      i = this.values.indexOf(value);
    } else {
      i = this.values
        .map((v) => (v as IEquality).equal(value as IEquality))
        .indexOf(true);
    }
    this.input.element.value = i < 0 ? '0' : String(i);
  }

  private setOutputValue(): void {
    this.output.element.value = this.getValue().toString();
  }
}
