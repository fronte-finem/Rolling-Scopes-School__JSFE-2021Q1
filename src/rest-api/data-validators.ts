import { ICar, IRaceParams, IRaceResult, IWinner } from './data-types';

type ObjectOf<T> = { [P in keyof T]: T[P] };

type Validator<T extends ObjectOf<T>> = (maybeT: T) => null | T;

function validateObject<T extends ObjectOf<T>>(
  data: unknown,
  validator: Validator<T>
): null | T {
  if (!(data instanceof Object)) return null;
  return validator(data as T);
}

export function validateGarage(data: unknown): null | Array<ICar | null> {
  return Array.isArray(data) ? data.map((v) => validateCar(v)) : null;
}

export function validateWinners(data: unknown): null | Array<IWinner | null> {
  return Array.isArray(data) ? data.map((v) => validateWinner(v)) : null;
}

export function validateCar(data: unknown): null | ICar {
  return validateObject(data, (maybeCar: ICar) =>
    typeof maybeCar.id === 'number' &&
    typeof maybeCar.name === 'string' &&
    typeof maybeCar.color === 'string'
      ? maybeCar
      : null
  );
}

export function validateWinner(data: unknown): null | IWinner {
  return validateObject(data, (maybeWinner: IWinner) =>
    typeof maybeWinner.id === 'number' &&
    typeof maybeWinner.wins === 'number' &&
    typeof maybeWinner.time === 'number'
      ? maybeWinner
      : null
  );
}

export function validateRaceParams(data: unknown): null | IRaceParams {
  return validateObject(data, (maybeRaceParams: IRaceParams) =>
    typeof maybeRaceParams.velocity === 'number' &&
    typeof maybeRaceParams.distance === 'number'
      ? maybeRaceParams
      : null
  );
}

export function validateRaceResult(data: unknown): null | IRaceResult {
  return validateObject(data, (maybeRaceResult: IRaceResult) =>
    typeof maybeRaceResult.success === 'boolean' ? maybeRaceResult : null
  );
}
