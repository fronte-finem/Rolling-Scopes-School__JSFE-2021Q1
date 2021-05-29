import { SIGN_UP } from 'app/configs/sign-up.config';
import { TextInputView } from 'components/input/text-input-view';
import { View } from 'shared/views/view';

import styles from './sign-up-view.scss';

export interface ISignUpResult {
  firstName: string;
  lastName: string;
  email: string;
}

export class SignUpView extends View {
  private form = new View<HTMLFormElement>({ tag: 'form' });

  private inputFirstName = new TextInputView(SIGN_UP.firstnName);

  private inputLastName = new TextInputView(SIGN_UP.lastName);

  private inputEmail = new TextInputView(SIGN_UP.email);

  public constructor() {
    super({ classNames: [styles.formWrapper] });
    this.init();
  }

  private init(): void {
    const wrapper = new View({ classNames: [styles.inputsWrapper] });
    this.render(this.form);
    this.form.render(wrapper);
    wrapper.render(this.inputs);
  }

  private get inputs(): TextInputView[] {
    return [this.inputFirstName, this.inputLastName, this.inputEmail];
  }

  public validate(): boolean {
    return this.inputs.every((input) => input.validate());
  }

  public reset(): void {
    this.inputs.map((input) => input.reset());
  }

  public getValue(): ISignUpResult {
    return {
      firstName: this.inputFirstName.input.element.value,
      lastName: this.inputLastName.input.element.value,
      email: this.inputEmail.input.element.value,
    };
  }
}
