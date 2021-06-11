import { Try } from 'shared/types';

import {
  HEADER_TOTAL_COUNT,
  OrderWinners,
  PageQuery,
  Route,
  SortWinners,
  WINNERS_PAGE_LIMIT_DEFAULT,
} from './api-config';
import { WinDTO, WinnersPageDTO } from './data-types';
import { validateWinDTO, validateWinDTOArray } from './data-validators';
import {
  fetcher,
  generateUrl,
  getStatusHandler,
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
): Promise<Try<WinnersPageDTO>> {
  const maybeResponse = await safeFetch(generateWinnersQuery(page, limit, sort, order));
  if (!(maybeResponse instanceof Response)) return maybeResponse;
  const totalCount = Number(maybeResponse.headers.get(HEADER_TOTAL_COUNT)) || 0;
  const maybeWinDTOArray = await safeResponseHandler(maybeResponse, validateWinDTOArray);
  return !Array.isArray(maybeWinDTOArray)
    ? maybeWinDTOArray
    : {
        winDTOArray: maybeWinDTOArray,
        totalCount: totalCount || maybeWinDTOArray.length,
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
export async function getWinner(id: number): Promise<Try<WinDTO>> {
  return fetcher({
    url: generateUrl(`${Route.WINNERS}/${id}`),
    validator: validateWinDTO,
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
export async function createWinner(winner: WinDTO): Promise<Try<WinDTO>> {
  return fetcher({
    url: generateUrl(Route.WINNERS),
    init: initPOST(winner),
    statusHandler: getStatusHandler(201),
    validator: validateWinDTO,
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
export async function updateWinner({ id, wins, time }: WinDTO): Promise<Try<WinDTO>> {
  return fetcher({
    url: generateUrl(`${Route.WINNERS}/${id}`),
    init: initPUT({ wins, time }),
    validator: validateWinDTO,
  });
}
