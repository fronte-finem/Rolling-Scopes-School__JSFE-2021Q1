import { EngineMode, EngineQuery, generateUrl, Route } from './api';
import { IRaceParams, IRaceResult } from './data-types';
import { validateRaceParams, validateRaceResult } from './data-validators';

/**
 * Starts engine of specified car, and returns it's actual velocity and distance.
 *
 * - URL: `/engine`
 *
 * - Method: `GET`
 *
 * - Headers: `None`
 *
 * - URL Params: `None`
 *
 * - Query Params:
 *   - Required:
 *     - `id=[integer]`
 *     - `status=['started']`
 *
 * - Data Params: `None`
 *
 * - Success Response:
 *   - Code: `200 OK`
 *   - Content: `IRaceParams`
 *
 * - Error Response:
 *   - Code: `400 BAD REQUEST`
 *   - Content: *Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"*
 *   - Code: `404 NOT FOUND`
 *   - Content: *Car with such id was not found in the garage.*
 */

export async function startEngine(id: number): Promise<IRaceParams | null> {
  const url = generateUrl(Route.ENGINE, {
    [EngineQuery.ID]: id,
    [EngineQuery.STATUS]: EngineMode.STARTED,
  });
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) return null;
  return validateRaceParams(await response.json());
}
/**
 * Stops engine of specified car, and returns it's actual velocity and distance.
 *
 * - URL: `/engine`
 *
 * - Method: `GET`
 *
 * - Headers: `None`
 *
 * - URL Params: `None`
 *
 * - Query Params:
 *   - Required:
 *     - `id=[integer]`
 *     - `status=['stopped']`
 *
 * - Data Params: `None`
 *
 * - Success Response:
 *   - Code: `200 OK`
 *   - Content: `IRaceParams`
 *
 * - Error Response:
 *   - Code: `400 BAD REQUEST`
 *   - Content: *Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"*
 *   - Code: `404 NOT FOUND`
 *   - Content: *Car with such id was not found in the garage.*
 */

export async function stopEngine(id: number): Promise<IRaceParams | null> {
  const url = generateUrl(Route.ENGINE, {
    [EngineQuery.ID]: id,
    [EngineQuery.STATUS]: EngineMode.STOPED,
  });
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) return null;
  return validateRaceParams(await response.json());
}
/**
 * Switches engine of specified car to drive mode and finishes with success message or fails with 500 error.
 *
 * - URL: `/engine`
 *
 * - Method: `GET`
 *
 * - Headers: `None`
 *
 * - URL Params: `None`
 *
 * - Query Params:
 *   - Required:
 *     - `id=[integer]`
 *     - `status=['drive']`
 *
 * - Data Params: `None`
 *
 * - Success Response:
 *   - Code: `200 OK`
 *   - Content: `IRaceResult`
 *
 * - Error Response:
 *   - Code: `400 BAD REQUEST`
 *   - Content: *Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"*
 *   - Code: `404 NOT FOUND`
 *   - Content: *Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to "started" before?*
 *   - Code: `429 TOO MANY REQUESTS`
 *   - Content: *Drive already in progress. You can't run drive for the same car twice while it's not stopped.*
 *   - Code: `500 INTERNAL SERVER ERROR`
 *   - Content: *Car has been stopped suddenly. It's engine was broken down.*
 *
 * - Notes:
 *   - *Before using this request you need to switch engine status to the 'started' status first.*
 *   - *Time when response will finish can be calculated using response from making engine 'started'.*
 *   - *Engine may fall randomly and at random time at the whole distance.*
 */

export async function driveEngine(id: number): Promise<IRaceResult | null> {
  const url = generateUrl(Route.ENGINE, {
    [EngineQuery.ID]: id,
    [EngineQuery.STATUS]: EngineMode.DRIVE,
  });
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) return null;
  return validateRaceResult(await response.json());
}
