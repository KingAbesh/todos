import { Request, Response, NextFunction } from "express";
import { HTTP, RESPONSE } from "@constants/enums";
import createError from "@helpers/createError";
import createResponse from "@helpers/createResponse";
import * as userService from "./user.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { error, message, data } = await userService.register({
      ...req.body,
    });

    if (error) {
      return next(
        createError(HTTP.BAD_REQUEST, {
          status: RESPONSE.ERROR,
          message,
          data,
        })
      );
    }
    return createResponse(message, data)(res, HTTP.CREATED);
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { error, message, data } = await userService.login({
      ...req.body,
    });

    if (error) {
      return next(
        createError(HTTP.BAD_REQUEST, {
          status: RESPONSE.ERROR,
          message,
          data,
        })
      );
    }
    return createResponse(message, data)(res, HTTP.OK);
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};

export const me = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { error, message, data } = await userService.me({
      userId: (req as any).userId,
    });

    if (error) {
      return next(
        createError(HTTP.BAD_REQUEST, {
          status: RESPONSE.ERROR,
          message,
          data,
        })
      );
    }
    return createResponse(message, data)(res, HTTP.OK);
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
