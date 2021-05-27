import styles from './text-input-view.scss';
import { ICreateViewOptions, View } from '../../shared/views/view';
import { ITextInputConfig } from '../../app/configs/inputs';
import { capitalize } from '../../shared/string-utils';

// https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
// https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation
// https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation

export type ICreateTextInputViewOptions = ICreateViewOptions & ITextInputConfig;

export class TextInputView extends View {
  private readonly label = new View<HTMLLabelElement>({
    tag: 'label',
    classNames: [styles.title],
  });

  public readonly input = new View<HTMLInputElement>({
    tag: 'input',
    classNames: [styles.input],
  });

  private readonly errorMessage: string;

  private readonly title: string;

  public constructor({
    title,
    type = 'text',
    placeholder = '',
    validation,
    classNames = [],
    ...options
  }: ICreateTextInputViewOptions) {
    super({ ...options, classNames: [styles.inputWrapper, ...classNames] });

    const { required, pattern, minLength, maxLength, errorMessage } =
      validation;

    this.title = capitalize(title);
    this.label.setText(this.title);
    this.errorMessage = errorMessage;

    this.input.element.type = type;
    this.input.element.placeholder = placeholder;
    this.input.element.required = required;
    this.input.element.pattern = pattern.source;
    this.input.element.minLength = minLength;
    this.input.element.maxLength = maxLength;

    this.render([this.label, this.input]);

    this.onInput(() => this.validate());
    this.onInvalid((validity) => this.setError(validity));
  }

  public validate(): boolean {
    this.resetError();
    return this.input.element.reportValidity();
  }

  public reset(): void {
    this.resetError();
    this.input.element.value = '';
  }

  private resetError() {
    this.input.element.setCustomValidity('');
    void this.setCssStateAsync(styles.error, false);
  }

  private setError(validity: ValidityState) {
    if (validity.valueMissing) {
      this.input.element.setCustomValidity(`${this.title} required`);
    } else if (validity.patternMismatch) {
      this.input.element.setCustomValidity(this.errorMessage);
    } else if (validity.tooShort) {
      this.input.element.setCustomValidity(
        `${this.title} should be at least ${this.input.element.minLength} characters; you entered ${this.input.element.value.length}.`
      );
    } else if (validity.tooLong) {
      this.input.element.setCustomValidity(
        `${this.title} should be less than ${this.input.element.maxLength} characters; you entered ${this.input.element.value.length}.`
      );
    }
    void this.setCssStateAsync(styles.error, true);
  }

  public onInput(
    listener: (value: string) => void,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.input.element.addEventListener(
      'input',
      () => listener(this.input.element.value),
      options
    );
  }

  public onInvalid(
    listener: (validity: ValidityState) => void,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.input.element.addEventListener(
      'invalid',
      () => listener(this.input.element.validity),
      options
    );
  }
}
