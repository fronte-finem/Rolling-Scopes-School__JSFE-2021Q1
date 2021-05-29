import {
  ITextInputConfig,
  ITextInputValidation,
} from 'components/input/input-types';

// При регистрации должна быть следующее правило проверки вводимых значений:
// - Возможно использование любого языка для ввода имени и фамилии.
// - Колличество символов не должно превышать 30 символов включая пробелы

// Имя | Фамилия:
// - Имя не может быть пустым.
// - Имя не может состоять из цифр.
// - Имя не может содержать служебные символы (~ ! @ # $ % * () _ — + = | : ; " ' ` < > , . ? / ^).

export const NAME_VALIDATION: ITextInputValidation = {
  required: true,
  errorMessage:
    "The name shouldn't contain only numbers and can't contain symbols: ~ ! @ # $ % * () _ — + = | : ; \" ' ` < > , . ? / ^",
  pattern: /^(?!\d+$)[^~!@#$%*()_—+=|:;"'`<>,.?/^]{1,30}$/,
  minLength: 1,
  maxLength: 30,
};

// email:
// - email не может быть пустым.
// - должен соответствовать стандартному правилу формированию email
//   [RFC](https://en.wikipedia.org/wiki/Email_address#Standards_documents)

// https://www.emailregex.com/
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#validation

export const EMAIIL_VALIDATION: ITextInputValidation = {
  required: true,
  errorMessage: 'Email not valid 🙁',
  pattern:
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  minLength: 3,
  maxLength: 30,
};

export const INPUT_FIRST_NAME_CONFIG: ITextInputConfig = {
  title: 'first name',
  type: 'text',
  placeholder: 'Jessie',
  validation: NAME_VALIDATION,
};

export const INPUT_LAST_NAME_CONFIG: ITextInputConfig = {
  title: 'last name',
  type: 'text',
  placeholder: 'Doe',
  validation: NAME_VALIDATION,
};

export const INPUT_EMAIL_CONFIG: ITextInputConfig = {
  title: 'e-mail',
  type: 'email',
  placeholder: 'Jessie.Doe@gmail.com',
  validation: EMAIIL_VALIDATION,
};
