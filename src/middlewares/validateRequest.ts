import { Request, Response, NextFunction } from "express";
import { HTTP, RESPONSE } from "@constants/enums";
import createError from "@helpers/createError";

/**
 * Creates a middleware to validate request payloads with Joi schemas
 */

type Result = { error: { details: any[]; message: string }; value: any };

export default function validateRequest(
  schema: { validate: Function },
  field: string = "body"
) {
  return function curried(
    req: Request,
    _res: Response,
    next: NextFunction
  ): void {
    const result: Result = schema.validate(req[field], {
      abortEarly: false,
      stripUnknown: true,
      errors: {
        wrap: {
          label: "",
        },
      },
    });
    if (result.error) {
      const parsedResult: any[] = Array.isArray(result.error.details)
        ? result.error.details.map((error) => ({
            [String(error.path[0])]: error.message,
          }))
        : [
            {
              [String(result.error.message.split(" ")[0])]:
                result.error.message,
            },
          ];
      return next(
        createError(HTTP.UNPROCESSABLE_ENTITY, {
          status: RESPONSE.ERROR,
          message: "validation failed",
          data: parsedResult,
        })
      );
    }

    req[field] = result.value;
    return next();
  };
}
