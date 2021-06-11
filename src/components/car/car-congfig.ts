export const CAR_EMPTY_ID = -1;
export const CAR_EMPTY_NAME = '';
export const CAR_EMPTY_COLOR = '#000000';

export enum CarEvent {
  UPDATE = 'update',
  UPDATE_WIN = 'update win',
  DRIVE = 'drive',
}

export enum CarState {
  INITIAL = 'initial',
  START = 'start',
  STOP = 'stop',
  DRIVE = 'race',
  BROKEN = 'broken',
  FINISH = 'finish',
}
