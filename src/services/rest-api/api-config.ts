/**
 * Task: https://github.com/rolling-scopes-school/tasks/blob/master/tasks/async-race.md
 *
 * Server API: https://github.com/mikhama/async-race-api
 */

export const SERVER = 'http://127.0.0.1:3000';

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

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

export enum PageQuery {
  PAGE = '_page',
  LIMIT = '_limit',
  SORT = '_sort',
  ORDER = '_order',
}

export enum EngineQuery {
  ID = 'id',
  STATUS = 'status',
}

export enum EngineMode {
  STARTED = 'started',
  STOPPED = 'stopped',
  DRIVE = 'drive',
}

export enum SortWinners {
  ID = 'id',
  WINS = 'wins',
  TIME = 'time',
}

export enum OrderWinners {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum FetchStatus {
  USER_ABORT = '4242',
  OK = '200',
  BAD_REQUEST = '400',
  NOT_FOUND = '404',
  TOO_MANY_REQUESTS = '429',
  INTERNAL_SERVER_ERROR = '500',
}
