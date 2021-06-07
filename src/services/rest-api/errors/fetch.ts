import { SERVER } from '../api-config';

export class FetchError extends Error {
  public constructor(message: string) {
    super(`\n${message}\n${SERVER}`);
  }
}
