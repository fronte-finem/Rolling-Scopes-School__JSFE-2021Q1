import { DEFAULT_TIMEOUT } from 'services/race/config';

export const CAR_EMPTY_ID = -1;
export const CAR_EMPTY_NAME = '';
export const CAR_EMPTY_COLOR = '#000000';
export const TIMEOUT = DEFAULT_TIMEOUT / 1000;

export enum CarState {
  INITIAL = 'initial',
  START = 'start',
  STOP = 'stop',
  DRIVE = 'race',
  BROKEN = 'broken',
  FINISH = 'finish',
}

export enum CarCSSVar {
  COLOR = '--color1',
  POSITION = '--position',
  LEG_TIME = '--leg-time',
  EYE_TIME = '--eye-time',
  EYE_DELAY = '--eye-delay',
  BODY_TIME = '--body-time',
  BODY_DELAY = '--body-delay',
}

const initial = (): [cssvar: CarCSSVar, value: string][] => [
  [CarCSSVar.POSITION, '0%'],
  [CarCSSVar.LEG_TIME, `${1 + Math.random()}s`],
  [CarCSSVar.EYE_TIME, '5s'],
  [CarCSSVar.EYE_DELAY, `${5 * Math.random()}s`],
  [CarCSSVar.BODY_TIME, `${2 + Math.random()}s`],
  [CarCSSVar.BODY_DELAY, `${Math.random()}s`],
];

const start = (): [cssvar: CarCSSVar, value: string][] => [
  [CarCSSVar.LEG_TIME, `${Math.random()}s`],
  [CarCSSVar.EYE_TIME, '3s'],
  [CarCSSVar.EYE_DELAY, `${0.2 * Math.random()}s`],
  [CarCSSVar.BODY_TIME, `${Math.random()}s`],
  [CarCSSVar.BODY_DELAY, `${0.2 * Math.random()}s`],
];

const run = (time: number): [cssvar: CarCSSVar, value: string][] => [
  [CarCSSVar.LEG_TIME, `${time}ms`],
  [CarCSSVar.EYE_TIME, '3s'],
  [CarCSSVar.EYE_DELAY, `${Math.random()}s`],
  [CarCSSVar.BODY_TIME, `${2 * time}ms`],
  [CarCSSVar.BODY_DELAY, `${Math.random()}s`],
];

const dead = (): [cssvar: CarCSSVar, value: string][] => [
  [CarCSSVar.LEG_TIME, '1s'],
  [CarCSSVar.EYE_TIME, '10s'],
  [CarCSSVar.EYE_DELAY, `${Math.random()}s`],
  [CarCSSVar.BODY_TIME, '5s'],
  [CarCSSVar.BODY_DELAY, `${Math.random()}s`],
];

const finish = (time: number): [cssvar: CarCSSVar, value: string][] => [
  [CarCSSVar.EYE_TIME, '5s'],
  [CarCSSVar.EYE_DELAY, `${Math.random()}s`],
  [CarCSSVar.BODY_TIME, `${2 * time}s`],
  [CarCSSVar.BODY_DELAY, `${Math.random()}s`],
];

export const TO_STATE = {
  initial,
  start,
  run,
  dead,
  finish,
};
