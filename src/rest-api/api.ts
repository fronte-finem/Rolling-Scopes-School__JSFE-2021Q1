/**
 * Task: https://github.com/rolling-scopes-school/tasks/blob/master/tasks/async-race.md
 *
 * Server API: https://github.com/mikhama/async-race-api
 */

const SERVER = 'http://127.0.0.1:3000';

export enum Route {
  GARAGE = '/garage',
  ENGINE = '/engine',
  WINNERS = '/winners',
}

export const HEADER_TOTAL_COUNT = 'X-Total-Count';

export const HEADER_JSON = Object.freeze({
  'Content-Type': 'application/json',
});

// "Garage" view: 2.4) There should be pagination on the "Garage" view (7 cars per one page).
export const GARAGE_PAGE_LIMIT_DEFAULT = 7;
// "Winners" view: 5.2) There should be pagination (10 winners per one page).
export const WINNERS_PAGE_LIMIT_DEFAULT = 10;

export const enum PageQuery {
  PAGE = '_page',
  LIMIT = '_limit',
  SORT = '_sort',
  ORDER = '_order',
}

export const enum EngineQuery {
  ID = 'id',
  STATUS = 'status',
}

export enum EngineMode {
  STARTED = 'started',
  STOPED = 'stoped',
  DRIVE = 'drive',
}

export const enum SortWinners {
  ID = 'id',
  WINS = 'wins',
  TIME = 'time',
}

export const enum OrderWinners {
  ASC = 'ASC',
  DESC = 'DESC',
}

type QueryParams = Record<string, string | number>;

export function generateUrl(
  path: string,
  queryParams: QueryParams = {}
): string {
  return `${SERVER}${path}${generateQuery(queryParams)}`;
}

function generateQuery(queryParams: QueryParams): string {
  return Object.entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}
