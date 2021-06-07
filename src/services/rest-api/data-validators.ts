import { Maybe } from 'shared/types';

import { ICar, IDriveParams, IDriveResult, IWinner } from './data-types';

type Validator<T> = (maybeData: T) => Maybe<T>;

function validateObject<T>(maybeData: unknown, validator: Validator<T>): Maybe<T> {
  if (!(maybeData instanceof Object)) return null;
  return validator(maybeData as T);
}

function validateArray<T>(maybeArray: unknown, validator: Validator<T>): Array<T> {
  if (!Array.isArray(maybeArray)) return [];
  return maybeArray
    .map((maybeData) => validator(maybeData))
    .filter((maybeT) => maybeT !== null) as Array<T>;
}

export function validateCars(maybeArray: unknown): Array<ICar> {
  return validateArray(maybeArray, validateCar);
}

export function validateWinners(maybeArray: unknown): Array<IWinner> {
  return validateArray(maybeArray, validateWinner);
}

export function validateCar(maybeData: unknown): Maybe<ICar> {
  return validateObject(maybeData, (maybeCar: ICar) =>
    typeof maybeCar.id === 'number' &&
    typeof maybeCar.name === 'string' &&
    typeof maybeCar.color === 'string'
      ? maybeCar
      : null
  );
}

export function validateWinner(maybeData: unknown): Maybe<IWinner> {
  return validateObject(maybeData, (maybeWinner: IWinner) =>
    typeof maybeWinner.id === 'number' &&
    typeof maybeWinner.wins === 'number' &&
    typeof maybeWinner.time === 'number'
      ? maybeWinner
      : null
  );
}

export function validateRaceParams(maybeData: unknown): Maybe<IDriveParams> {
  return validateObject(maybeData, (maybeRaceParams: IDriveParams) =>
    typeof maybeRaceParams.velocity === 'number' && typeof maybeRaceParams.distance === 'number'
      ? maybeRaceParams
      : null
  );
}

export function validateRaceResult(maybeData: unknown): Maybe<IDriveResult> {
  return validateObject(maybeData, (maybeDriveResult: IDriveResult) =>
    typeof maybeDriveResult.success === 'boolean' ? maybeDriveResult : null
  );
}
