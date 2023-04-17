import { Response } from "express";

/**
 * Creates a reusable response payload
 *
 */
const createResponse =
  (
    message: string,
    data: object[] | null | object = null,
    status: string = "success"
  ) =>
  (res: Response, code: number): Response<any, Record<string, any>> => {
    return res.status(code).json({ status, message, data });
  };

export default createResponse;
