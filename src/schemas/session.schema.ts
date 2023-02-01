import { string, object, TypeOf } from "zod";

export const createSessionSchema = object({
  body: object({
    email: string({ required_error: `email is required` }),
    password: string({ required_error: `email is required` }).min(
      8,
      "passwords must be at least 8 characters long"
    ),
  }),
});
export const updateSessionSchema = object({
  params: object({
    sessionId: string({ required_error: "session id must be string" }),
  }),
});

export type createUserInput = TypeOf<typeof createSessionSchema>;
export type updateSessionInput = TypeOf<typeof updateSessionSchema>["params"];
