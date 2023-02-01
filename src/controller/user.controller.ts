import express, { Request, Response } from "express";
import {
  createUser,
  findUser,
  findUserByEmail,
  getUsers,
} from "../services/user.service";
import { customAlphabet } from "nanoid";
import { omit } from "lodash";
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 8);

export async function createUserHandler(req: Request<{}, {}>, res: Response) {
  const body = req.body;

  if (!body) {
    return res.status(422).send({ message: "invalid credentials" });
  }
  try {
    const user = await createUser({ ...req.body });
    // await sendMail({
    //   to: user.email,
    //   from: "jc-api@careers.com",
    //   subject: "verify your email",
    //   text: `verification code is ${user.verificationCode} and Id is ${user._id}`,
    // });
    return res.status(200).send({ message: omit(user.toJSON(), "password") });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `${error} user could not be registered` });
  }
}
export async function verifyUserHandler(req: Request, res: Response) {
  const { id, verificationCode } = req.params;
  const user = await findUser(id);

  if (!user) {
    return res.status(400).send({ message: "user not found" });
  }

  if (user.verified) {
    return res.status(300).send({ message: "user already verified" });
  }
  try {
    if (user.verificationCode == verificationCode) {
      user.verified = true;
      user.save();
      return res.status(200).send({ message: "you are now verified" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: `could not be verified - ${error}` });
  }
}
export async function forgotPasswordHandler(req: Request, res: Response) {
  const { email } = req.body;
  if (!email) {
    return res.status(422).send("invalid input");
  }
  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(400).send({ message: `the email provided is not valid` });
  }
  if (!user.verified) {
    return res
      .status(400)
      .send({ message: `${user} please verify your email first` });
  }
  try {
    const pRC = nanoid();
    user.passwordResetCode = pRC;
    user.save();
    // await sendMail({
    //   to: user.email,
    //   from: "jc-careers@team.com",
    //   subject: `Your Password Reset`,
    //   text: `your password reset code is ${pRC} and id is ${user._id}`,
    // });
    return res
      .status(200)
      .send(`please check your email: ${user.passwordResetCode}`);
  } catch (error) {
    return res.status(400).send({ message: `the email provided is not valid` });
  }
}
export async function resetPasswordHandler(req: Request, res: Response) {
  const { id, passwordresetcode } = req.params;
  const { password } = req.body;

  const user = await findUser(id);

  if (!user || !user.verified) {
    return res.status(400).send({
      message: `user not verified`,
    });
  }

  if (!password || user.passwordResetCode != passwordresetcode) {
    return res.status(400).send({
      message: `password not provided or reset code is not valid`,
    });
  }
  try {
    user.password = password;
    user.passwordResetCode = null;
    user.save();

    return res.status(200).send({
      message: `password successfully updated`,
    });
  } catch (error) {
    return res.status(500).send({
      message: `an error ocurred ${error}`,
    });
  }
}
export async function getUsersHandler(req: Request, res: Response) {
  try {
    const users = await getUsers();

    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(`error getting all users ${error}`);
  }
}
