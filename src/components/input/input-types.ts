// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
// https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
// https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation
// https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation

export type TextTypeInput =
  | 'text'
  | 'email'
  | 'password'
  | 'search'
  | 'tel'
  | 'url';

export type HiddenTypeInput = 'hidden';

export type RangeTypeInput =
  | 'number'
  | 'range'
  | 'date'
  | 'month'
  | 'datetime'
  | 'datetime-local'
  | 'time'
  | 'week';

export type BtnTypeInput =
  | 'button'
  | 'radio'
  | 'checkbox'
  | 'file'
  | 'reset'
  | 'submit'
  | 'image'
  | 'range';

export interface ITextInputValidation {
  readonly required: boolean;
  readonly errorMessage: string;
  readonly pattern: RegExp;
  readonly minLength: number;
  readonly maxLength: number;
}

export interface ITextInputConfig {
  readonly title: string;
  readonly type: TextTypeInput;
  readonly placeholder?: string;
  readonly validation: ITextInputValidation;
}
