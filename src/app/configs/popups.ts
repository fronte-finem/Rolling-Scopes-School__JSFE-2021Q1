import { IBtnConfig } from './buttons';
import {
  INPUT_EMAIL_CONFIG,
  INPUT_FIRST_NAME_CONFIG,
  INPUT_LAST_NAME_CONFIG,
  ITextInputConfig,
} from './inputs';

export type PopUpSignUpInputs = 'firstnName' | 'lastName' | 'email';
export type PopUpSignUpBtns = 'addUser' | 'cancel';

export type PopUpVictoryBtns = 'confirm';

export interface IPopUpConfig<
  InputKeys extends string,
  BtnKeys extends string
> {
  readonly title: string;
  readonly btns: Record<BtnKeys, IBtnConfig>;
  readonly inputs: Record<InputKeys, ITextInputConfig>;
}

const APP_POPUP_SINGUP_INPUTS_CONFIG: Record<
  PopUpSignUpInputs,
  ITextInputConfig
> = {
  firstnName: INPUT_FIRST_NAME_CONFIG,
  lastName: INPUT_LAST_NAME_CONFIG,
  email: INPUT_EMAIL_CONFIG,
};

const APP_POPUP_SINGUP_BTNS_CONFIG: Record<PopUpSignUpBtns, IBtnConfig> = {
  addUser: { text: 'add user' },
  cancel: { text: 'cancel' },
};

const APP_POPUP_VICTORY_BTNS_CONFIG: Record<PopUpVictoryBtns, IBtnConfig> = {
  confirm: { text: 'OK' },
};

type PopUpSigUpConfig = Readonly<
  IPopUpConfig<PopUpSignUpInputs, PopUpSignUpBtns>
>;

export const APP_POPUP_SINGUP_CONFIG: PopUpSigUpConfig = {
  title: '🦸‍♀️ Registr new Player 🦸',
  btns: APP_POPUP_SINGUP_BTNS_CONFIG,
  inputs: APP_POPUP_SINGUP_INPUTS_CONFIG,
};

type PopUpVictoryConfig = Readonly<IPopUpConfig<string, PopUpVictoryBtns>>;

export const APP_POPUP_VICTORY_CONFIG: PopUpVictoryConfig = {
  title: '🏆 Victory! 🏆',
  inputs: {},
  btns: APP_POPUP_VICTORY_BTNS_CONFIG,
};

// Форма в целом:
// - В случае несоответствия любого из вышеуказанных правил, необходимо блокировать кнопку создания пользователя
// - Все неправильные поля должны быть подсвечены и иметь соответствующие сообщения об ошибках.
// - После нажатия на кнопку создания игрока страница не должна перезагружаться.
// - После нажатия на кнопку cancel вся ранее заполненная информация должна быть сброшена.

// Если все данные игрока корректны, все правильно заполненные поля должны быть помеченные как правильные.
