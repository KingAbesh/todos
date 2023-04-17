import { HTTP, RESPONSE } from "@constants/enums";

export interface ErrorObject {
  status?: string;
  message: string;
  data: object | null | unknown;
}

export interface ErrorResponse extends ErrorObject {
  statusCode: number | null;
}

/**
 * Creates an error payload
 */
export default function createError(
  status: number | null,
  errors: ErrorObject
): ErrorResponse {
  return {
    statusCode: status,
    ...errors,
  };
}

createError.InternalServerError = (
  data: object | null | unknown
): ErrorResponse =>
  createError(HTTP.SERVER_ERROR, {
    status: RESPONSE.ERROR,
    message: "Internal Server Error",
    data,
  });
