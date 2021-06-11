import { Maybe } from 'shared/types';

import { CarDTO, DriveParamsDTO, DriveResultDTO, WinDTO } from './data-types';

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

export function validateCarDTOArray(maybeArray: unknown): Array<CarDTO> {
  return validateArray(maybeArray, validateCarDTO);
}

export function validateWinDTOArray(maybeArray: unknown): Array<WinDTO> {
  return validateArray(maybeArray, validateWinDTO);
}

export function validateCarDTO(maybeData: unknown): Maybe<CarDTO> {
  return validateObject(maybeData, (carDTO: CarDTO) =>
    typeof carDTO.id === 'number' &&
    typeof carDTO.name === 'string' &&
    typeof carDTO.color === 'string'
      ? carDTO
      : null
  );
}

export function validateWinDTO(maybeData: unknown): Maybe<WinDTO> {
  return validateObject(maybeData, (winDTO: WinDTO) =>
    typeof winDTO.id === 'number' &&
    typeof winDTO.wins === 'number' &&
    typeof winDTO.time === 'number'
      ? winDTO
      : null
  );
}

export function validateRaceParamsDTO(maybeData: unknown): Maybe<DriveParamsDTO> {
  return validateObject(maybeData, (driveParamsDTO: DriveParamsDTO) =>
    typeof driveParamsDTO.velocity === 'number' && typeof driveParamsDTO.distance === 'number'
      ? driveParamsDTO
      : null
  );
}

export function validateRaceResultDTO(maybeData: unknown): Maybe<DriveResultDTO> {
  return validateObject(maybeData, (driveResultDTO: DriveResultDTO) =>
    typeof driveResultDTO.success === 'boolean' ? driveResultDTO : null
  );
}
