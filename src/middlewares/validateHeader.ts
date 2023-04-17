import { HTTP, RESPONSE } from "@constants/enums";
import createError from "@helpers/createError";
import { NextFunction, Request, Response } from "express";

export const validateHeader =
  (headerKey: string, headerValue: string) =>
  (req: Request, _: Response, next: NextFunction) => {
    try {
      const reqValue = req.headers[headerKey];

      if (reqValue !== headerValue) {
        return next(
          createError(HTTP.UNAUTHORIZED, {
            status: RESPONSE.ERROR,
            message: "Unauthorized",
            data: null,
          })
        );
      }

      return next();
    } catch (err) {
      return next(createError.InternalServerError(err));
    }
  };
