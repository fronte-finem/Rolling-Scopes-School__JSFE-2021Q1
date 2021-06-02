import {
  generateUrl,
  HEADER_JSON,
  HEADER_TOTAL_COUNT,
  OrderWinners,
  PageQuery,
  Route,
  SortWinners,
  WINNERS_PAGE_LIMIT_DEFAULT,
} from './api';
import { IWinner, IWinnerParams, IWinnersResponse } from './data-types';
import { validateWinner, validateWinners } from './data-validators';

/**
 * Returns json data about winners.
 *
 * - URL: `/winners`
 *
 * - Method: `GET`
 *
 * - Headers: `None`
 *
 * - URL Params: `None`
 *
 * - Query Params
 *   - Optional:
 *     - `_page=[integer]`
 *     - `_limit=[integer]`
 *     - `_sort=['id'|'wins'|'time']`
 *     - `_order=['ASC'|'DESC']`
 *
 * - Data Params: `None`
 *
 * - Success Response:
 *   - Code: `200 OK`
 *   - Content: `IWinnersResponse`
 *
 * - Response Headers: `None | X-Total-Count`
 *   - *if `_limit` param is passed api returns a header that countains total number of records*
 */

export async function getWinners(
  page: number,
  limit: number = WINNERS_PAGE_LIMIT_DEFAULT,
  sort: SortWinners = SortWinners.ID,
  order: OrderWinners = OrderWinners.ASC
): Promise<IWinnersResponse> {
  const url = generateUrl(Route.WINNERS, {
    [PageQuery.PAGE]: page,
    [PageQuery.LIMIT]: limit,
    [PageQuery.SORT]: sort,
    [PageQuery.ORDER]: order,
  });
  const response = await fetch(url, { method: 'GET' });
  const maybeTotalCount = response.headers.get(HEADER_TOTAL_COUNT);
  const totalCount = maybeTotalCount ? Number(maybeTotalCount) : null;
  const winners = validateWinners(await response.json());
  return { winners, totalCount };
}
/**
 * Returns json data about specified winner.
 *
 * - URL: `/winners/:id`
 *
 * - Method: `GET`
 *
 * - Headers: `None`
 *
 * - URL Params:
 *   - Required:
 *     - `id=[integer]`
 *
 * - Query Params: `None`
 *
 * - Data Params: `None`
 *
 * - Success Response:
 *   - Code: `200 OK`
 *   - Content: `IWinner`
 *
 * - Error Response:
 *   - Code: `404 NOT FOUND`
 *   - Content: `{}`
 */

export async function getWinner(id: number): Promise<IWinner | null> {
  const url = generateUrl(`${Route.WINNERS}/${id}`);
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) return null;
  return validateWinner(await response.json());
}
/**
 * Creates a new records in a winners table.
 *
 * - URL: `/winners`
 *
 * - Method: `POST`
 *
 * - Headers:
 *   - `'Content-Type': 'application/json'`
 *
 * - URL Params: `None`
 *
 * - Query Params: `None`
 *
 * - Data Params: `IWinner`
 *
 * - Success Response:
 *   - Code: `201 CREATED`
 *   - Content: `IWinner`
 *
 * - Error Response:
 *   - Code: `500 INTERNAL SERVER ERROR`
 *   - Content: *Error: Insert failed, duplicate id*
 */

export async function createWinner(winner: IWinner): Promise<IWinner | null> {
  const url = generateUrl(Route.WINNERS);
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(winner),
    headers: HEADER_JSON,
  });
  if (response.status !== 201) return null;
  return validateWinner(await response.json());
}
/**
 * Delete specified car from a garage
 *
 * - URL: `/winners/:id`
 *
 * - Method: `DELETE`
 *
 * - Headers: `None`
 *
 * - URL Params:
 *   - Required:
 *     - `id=[integer]`
 *
 * - Query Params: `None`
 *
 * - Data Params: `None`
 *
 * - Success Response:
 *   - Code: `200 OK`
 *   - Content: `{}`
 *
 * - Error Response:
 *   - Code: `404 NOT FOUND`
 *   - Content: `{}`
 */

export async function deleteWinner(id: number): Promise<void> {
  const url = generateUrl(`${Route.WINNERS}/${id}`);
  await fetch(url, { method: 'DELETE' });
}
/**
 * Creates a new records in a winners table.
 *
 * - URL: `/winners/:id`
 *
 * - Method: `PUT`
 *
 * - Headers:
 *   - `'Content-Type': 'application/json'`
 *
 * - URL Params:
 *   - Required:
 *     - `id=[integer]`
 *
 * - Query Params: `None`
 *
 * - Data Params: `IWinnerParams`
 *
 * - Success Response:
 *   - Code: `200 OK`
 *   - Content: `IWinner`
 *
 * - Error Response:
 *   - Code: `404 NOT FOUND`
 *   - Content: `{}`
 */

export async function updateWinner(
  winnerParams: IWinnerParams
): Promise<IWinner | null> {
  const url = generateUrl(Route.WINNERS);
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(winnerParams),
    headers: HEADER_JSON,
  });
  if (response.status !== 200) return null;
  return validateWinner(await response.json());
}
