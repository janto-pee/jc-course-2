import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";

export async function deSerializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = (req.headers.authorization || "").replace(
    /^Bearer\s/,
    ""
  );
  if (!accessToken) {
    return next();
  }

  const decoded = verifyJwt(accessToken, "aTPK");

  if (decoded) {
    res.locals.user = decoded;
  }
  return next();
}
