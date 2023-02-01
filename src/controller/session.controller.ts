import express, { Request, Response } from "express";
import {
  createSession,
  getSessions,
  updateSession,
} from "../services/session.services";
import { findUserByEmail } from "../services/user.service";
import { signJwt } from "../utils/jwt";
import config from "config";

export async function createSessionHandler(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  const userAgent = req.get("userAgent") || "";
  if (!user) {
    return res.status(400).send(`username or password incorrect`);
  }
  if (!user.verified) {
    return res.status(400).send(`user not verified`);
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return res.status(400).send(`username or password incorrect`);
  }
  try {
    const session = await createSession({
      user: user._id,
      valid: true,
      userAgent: userAgent,
    });

    const accessToken = await signJwt(
      { ...user, session: session._id },
      "aTPrK",
      {
        expiresIn: config.get("aTTTL"),
      }
    );
    const refreshToken = await signJwt(
      { ...user, session: session._id },
      "rTPrK",
      {
        expiresIn: config.get("rTTTL"),
      }
    );
    if (!accessToken || !refreshToken) {
      return res.status(400).send("could not sign user in");
    }
    const show = { accessToken: accessToken, refreshToken: refreshToken };
    return res.status(200).send(show);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function getSessionsHandler(req: Request, res: Response) {
  try {
    const session = await getSessions();
    return res.status(200).send(session);
  } catch (error) {
    return res.status(400).send(`could nor get session ${error}`);
  }
}
export async function updateSessionHandler(req: Request, res: Response) {
  const { sessionId } = req.params;

  const body = req.body;
  try {
    const session = await updateSession(sessionId, { ...body });
    return res.status(200).send(session);
  } catch (error) {
    return res.status(400).send(`could not update session ${error}`);
  }
}
