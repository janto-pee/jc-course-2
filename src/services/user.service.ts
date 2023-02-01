import express, { Request, Response } from "express";
import { Omit, omit } from "lodash";
import UserModel, { UserInput } from "../models/user.model";

export async function createUser(userInput: UserInput) {
  const res = await UserModel.create(userInput);
  return res;
}
export async function getUsers() {
  const res = UserModel.find();
  return res;
}

export async function findUser(id: string) {
  const res = UserModel.findById(id);
  return res;
}
export async function findUserByEmail(id: string) {
  const res = UserModel.findOne({ email: id });
  return res;
}
