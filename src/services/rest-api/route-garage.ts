import { Try } from 'shared/types';

import { GARAGE_PAGE_LIMIT_DEFAULT, HEADER_TOTAL_COUNT, PageQuery, Route } from './api-config';
import { CarDTO, GaragePageDTO } from './data-types';
import { validateCarDTO, validateCarDTOArray } from './data-validators';
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

const generateGarageQuery = (page: number, limit = GARAGE_PAGE_LIMIT_DEFAULT) => ({
  url: generateUrl(Route.GARAGE, {
    [PageQuery.PAGE]: page,
    [PageQuery.LIMIT]: limit,
  }),
});

/**
 * Returns json data about cars in a garage.
 *
 * - URL: `/garage`
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
 *
 * - Data Params: `None`
 *
 * - Success Response:
 *   - Code: `200 OK`
 *   - Content: `IGarage`
 *
 * - Response Headers: `None | X-Total-Count`
 *   - *if `_limit` param is passed api returns a header that countains total number of records*
 */
export async function getCars(page: number, limit?: number): Promise<Try<GaragePageDTO>> {
  const maybeResponse = await safeFetch(generateGarageQuery(page, limit));
  if (!(maybeResponse instanceof Response)) return maybeResponse;
  const totalCount = Number(maybeResponse.headers.get(HEADER_TOTAL_COUNT)) || 0;
  const maybeCarDTOArray = await safeResponseHandler(maybeResponse, validateCarDTOArray);
  return !Array.isArray(maybeCarDTOArray)
    ? maybeCarDTOArray
    : {
        carDTOArray: maybeCarDTOArray,
        totalCount: totalCount || maybeCarDTOArray.length,
      };
}

/**
 * Returns json data about specified car.
 *
 * - URL: `/garage/:id`
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
 *   - Content: `ICar`
 *
 * - Error Response:
 *   - Code: `404 NOT FOUND`
 *   - Content: `{}`
 */
export async function getCar(id: number): Promise<Try<CarDTO>> {
  return fetcher({
    url: generateUrl(`${Route.GARAGE}/${id}`),
    validator: validateCarDTO,
  });
}

/**
 * Creates a new car in a garage.
 *
 * - URL: `/garage`
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
 * - Data Params: `ICarParams`
 *
 * - Success Response:
 *   - Code: `201 CREATED`
 *   - Content: `ICar`
 */
export async function createCar({ name, color }: CarDTO): Promise<Try<CarDTO>> {
  return fetcher({
    url: generateUrl(Route.GARAGE),
    init: initPOST({ name, color }),
    statusHandler: getStatusHandler(201),
    validator: validateCarDTO,
  });
}

/**
 * Delete specified car from a garage
 *
 * - URL: `/garage/:id`
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
export async function deleteCar(id: number): Promise<Try<boolean>> {
  return fetcher({
    url: generateUrl(`${Route.GARAGE}/${id}`),
    init: initDELETE(),
    validator: () => true,
  });
}

/**
 * Updates attributes of specified car.
 *
 * - URL: `/garage/:id`
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
 * - Data Params: `ICarParams`
 *
 * - Success Response:
 *   - Code: `200 OK`
 *   - Content: `ICar`
 *
 * - Error Response:
 *   - Code: `404 NOT FOUND`
 *   - Content: `{}`
 */
export async function updateCar({ id, name, color }: CarDTO): Promise<Try<CarDTO>> {
  return fetcher({
    url: generateUrl(`${Route.GARAGE}/${id}`),
    init: initPUT({ name, color }),
    validator: validateCarDTO,
  });
}
