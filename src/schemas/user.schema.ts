import { string, object, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({ required_error: "User name is required" }),
    email: string({ required_error: "email is required" }).email(
      "Not a valid email"
    ),
    password: string({ required_error: "User name is required" }).min(
      8,
      "password must be at least 8 characters long"
    ),
    confirm_password: string({ required_error: "User name is required" }),
  }).refine((data) => data.password === data.confirm_password, {
    message: "password and confirm password do not match",
    path: ["confirm_password"],
  }),
};

export const createUserSchema = object({
  ...payload,
});

export const verifyUserSchema = object({
  params: object({
    verificationCode: string({ required_error: "id is required" }),
    id: string({ required_error: "id is required" }),
  }),
});
export const forgotPasswordSchema = object({
  body: object({
    email: string({ required_error: "email is required" }).email(
      "Not a valid email"
    ),
  }),
});

export const resetPasswordSchema = object({
  body: object({
    password: string({ required_error: "User name is required" }).min(
      8,
      "password must be at least 8 characters long"
    ),
  }),
  params: object({
    passwordresetcode: string({ required_error: "id is required" }),
    id: string({ required_error: "id is required" }),
  }),
});

export type createUserInput = TypeOf<typeof createUserSchema>["body"];
export type verifyUserInput = TypeOf<typeof verifyUserSchema>["params"];
export type forgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];
export type resetPasswordInput = TypeOf<typeof resetPasswordSchema>;
