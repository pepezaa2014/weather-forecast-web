import HTTPStatusCode from "../constants/http-status-code";

export enum RestErrorCode {
  NotSpecific = "0000",
  AccountUnverified = "0401",
  IncorrectPassword = "0402",
}
export class RestError extends Error {
  constructor(
    readonly code: HTTPStatusCode,
    readonly errorTitle?: string,
    readonly errorMessage?: string,
    readonly tKey?: string,
    readonly tParams?: any,
    readonly errorCode?: RestErrorCode
  ) {
    super(errorMessage ?? "RestError");
  }

  static notFound = new RestError(
    HTTPStatusCode.NOT_FOUND,
    undefined,
    undefined,
    "error.not_found"
  );
}
