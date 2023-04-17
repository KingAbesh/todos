import { Request, Response, NextFunction } from "express";
import { HTTP, RESPONSE } from "@constants/enums";
import createError from "@helpers/createError";
import createResponse from "@helpers/createResponse";
import * as todoService from "./todo.service";

export const addTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { error, message, data } = await todoService.addTodo({
      ...req.body,
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
    return createResponse(message, data)(res, HTTP.CREATED);
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};

export const getTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { error, message, data } = await todoService.getTodo({
      ...(req as any).params,
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

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { error, message, data } = await todoService.updateTodo({
      ...(req as any).body,
      ...(req as any).params,
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

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { error, message, data } = await todoService.deleteTodo({
      ...(req as any).params,
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

export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { error, message, data } = await todoService.getTodos({
      ...(req as any).query,
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
