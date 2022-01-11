export class ParseJsonError extends Error {
  public constructor(message: string) {
    super(`Parse JSON Error: ${message}`);
  }
}
