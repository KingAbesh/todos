import { Request, Response, NextFunction } from "express";
import { HTTP, RESPONSE } from "@constants/enums";
import createError from "@helpers/createError";
import { jwtVerify } from "@helpers/jwt";
import models from "../db/models";

const { User } = models;

export const checkAuth: (
  req: Request,
  _: Response,
  next: NextFunction
) => Promise<void> = async (req: Request, _: Response, next: NextFunction) => {
  const message = "Unauthorized";
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (!token) {
    return next(
      createError(HTTP.UNAUTHORIZED, {
        status: RESPONSE.ERROR,
        message,
        data: null,
      })
    );
  }
  try {
    const { id, iat } = jwtVerify(token);

    const user = await User.findByPk(id);

    if (!user) {
      return next(
        createError(HTTP.UNAUTHORIZED, {
          status: RESPONSE.ERROR,
          message,
          data: null,
        })
      );
    }

    // Maintain one login session
    if (user.tokenIssueTime > new Date((iat as any) * 1000)) {
      return next(
        createError(HTTP.UNAUTHORIZED, {
          status: RESPONSE.ERROR,
          message: "Logged in on a different device",
          data: null,
        })
      );
    }

    (req as any).userId = id;
    (req as any).user = user;
    return next();
  } catch (err) {
    console.log(err);
    return next(createError.InternalServerError(err));
  }
};
