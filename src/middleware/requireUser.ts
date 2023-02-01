import express, { NextFunction, Request, Response } from "express";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals._id;
  if (user) {
    return next();
  }
};
