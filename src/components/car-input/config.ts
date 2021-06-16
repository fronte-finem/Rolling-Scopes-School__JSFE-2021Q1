import { CAR_EMPTY_ID } from 'components/car';

export enum CarInputButton {
  SUBMIT = 'submit',
  CANCEL = 'cancel',
}

const DEFAULT_COLOR = '#ff0000';
export const DEFAULT_CAR_DTO = { id: CAR_EMPTY_ID, name: '', color: DEFAULT_COLOR };
