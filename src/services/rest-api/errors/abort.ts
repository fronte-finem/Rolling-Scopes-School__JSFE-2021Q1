const ABORT = 'User interrupt REST API action';

export class AbortError extends Error {
  public constructor() {
    super(ABORT);
  }
}
