import {
  GARAGE_PAGE_LIMIT_DEFAULT,
  generateUrl,
  HEADER_JSON,
  HEADER_TOTAL_COUNT,
  PageQuery,
  Route,
} from './api';
import { ICar, ICarParams, IGarageResponse } from './data-types';
import { validateCar, validateGarage } from './data-validators';

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
 *   - Content: `IGarageResponse`
 *
 * - Response Headers: `None | X-Total-Count`
 *   - *if `_limit` param is passed api returns a header that countains total number of records*
 */

export async function getGarage(
  page: number,
  limit: number = GARAGE_PAGE_LIMIT_DEFAULT
): Promise<IGarageResponse> {
  const url = generateUrl(Route.GARAGE, {
    [PageQuery.PAGE]: page,
    [PageQuery.LIMIT]: limit,
  });
  const response = await fetch(url, { method: 'GET' });
  const maybeTotalCount = response.headers.get(HEADER_TOTAL_COUNT);
  const totalCount = maybeTotalCount ? Number(maybeTotalCount) : null;
  const cars = validateGarage(await response.json());
  return { cars, totalCount };
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

export async function getCar(id: number): Promise<ICar | null> {
  const url = generateUrl(`${Route.GARAGE}/${id}`);
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) return null;
  return validateCar(await response.json());
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

export async function createCar(carParam: ICarParams): Promise<ICar | null> {
  const url = generateUrl(Route.GARAGE);
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(carParam),
    headers: HEADER_JSON,
  });
  if (response.status !== 201) return null;
  return validateCar(await response.json());
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

export async function deleteCar(id: number): Promise<void> {
  const url = generateUrl(`${Route.GARAGE}/${id}`);
  await fetch(url, { method: 'DELETE' });
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

export async function updateCar(
  id: number,
  carParam: ICarParams
): Promise<ICar | null> {
  const url = generateUrl(`${Route.GARAGE}/${id}`);
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(carParam),
    headers: HEADER_JSON,
  });
  if (response.status !== 200) return null;
  return validateCar(await response.json());
}
