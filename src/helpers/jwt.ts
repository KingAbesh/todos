import config from "@config";
import jwt from "jsonwebtoken";

interface JWTVerifyResult extends jwt.JwtPayload {
  id?: string;
  iat?: number;
}

export const jwtSign = (id: number, expiresIn?: string): string => {
  return jwt.sign({ id }, config().secrets.jwtSecret, {
    expiresIn: expiresIn || config().secrets.expiresIn,
  });
};

export const jwtVerify = (token: string): JWTVerifyResult => {
  return jwt.verify(token, config().secrets.jwtSecret) as JWTVerifyResult;
};

export const jwtDecode = (token: string): string | jwt.JwtPayload | null => {
  return jwt.decode(token);
};
