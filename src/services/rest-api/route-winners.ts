import { Try } from 'shared/types';

import {
  HEADER_TOTAL_COUNT,
  OrderWinners,
  PageQuery,
  Route,
  SortWinners,
  WINNERS_PAGE_LIMIT_DEFAULT,
} from './api-config';
import { IWinner, IWinnerParams, IWinners } from './data-types';
import { validateWinner, validateWinners } from './data-validators';
import {
  fetcher,
  generateUrl,
  initDELETE,
  initPOST,
  initPUT,
  safeFetch,
  safeResponseHandler,
} from './helpers';

const generateWinnersQuery = (
  page: number,
  limit = WINNERS_PAGE_LIMIT_DEFAULT,
  sort = SortWinners.ID,
  order = OrderWinners.ASC
) => ({
  url: generateUrl(Route.WINNERS, {
    [PageQuery.PAGE]: page,
    [PageQuery.LIMIT]: limit,
    [PageQuery.SORT]: sort,
    [PageQuery.ORDER]: order,
  }),
});

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
 *   - Content: `IWinners`
 *
 * - Response Headers: `None | X-Total-Count`
 *   - *if `_limit` param is passed api returns a header that countains total number of records*
 */
export async function getWinners(
  page: number,
  limit?: number,
  sort?: SortWinners,
  order?: OrderWinners
): Promise<Try<IWinners>> {
  const maybeResponse = await safeFetch(generateWinnersQuery(page, limit, sort, order));
  if (!(maybeResponse instanceof Response)) return maybeResponse;
  const totalCount = Number(maybeResponse.headers.get(HEADER_TOTAL_COUNT)) || 0;
  const maybeWinners = await safeResponseHandler(maybeResponse, validateWinners);
  return !Array.isArray(maybeWinners)
    ? maybeWinners
    : {
        winners: maybeWinners,
        totalCount: totalCount || maybeWinners.length,
      };
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
export async function getWinner(id: number): Promise<Try<IWinner>> {
  return fetcher({
    url: generateUrl(`${Route.WINNERS}/${id}`),
    validator: validateWinner,
  });
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
export async function createWinner(winner: IWinner): Promise<Try<IWinner>> {
  return fetcher({
    url: generateUrl(Route.WINNERS),
    init: initPOST(winner),
    validator: validateWinner,
  });
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
export async function deleteWinner(id: number): Promise<Try<boolean>> {
  return fetcher({
    url: generateUrl(`${Route.WINNERS}/${id}`),
    init: initDELETE(),
    validator: () => true,
  });
}

/**
 * Updates attributes of specified winner.
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
export async function updateWinner(id: number, winnerParams: IWinnerParams): Promise<Try<IWinner>> {
  return fetcher({
    url: generateUrl(`${Route.WINNERS}/${id}`),
    init: initPUT(winnerParams),
    validator: validateWinner,
  });
}
