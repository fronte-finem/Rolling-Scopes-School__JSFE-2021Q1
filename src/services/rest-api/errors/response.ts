export class ResponseError extends Error {
  public constructor(response: Response) {
    super(`\n${response.url}\n${response.status} ${response.statusText}\n${response.type}`);
  }
}
