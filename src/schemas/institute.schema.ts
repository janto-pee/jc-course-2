import { string, object, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({ required_error: "name is required" }),
    fullname: string({ required_error: "fullname is required" }),
    instituteSummary: string({
      required_error: "instituteSummary is required",
    }),
    pmb: string({ required_error: "pmb is required" }),
    address: string({ required_error: "address is required" }),
    tel: string({ required_error: "tel is required" }),
  }),
};

export const getInstituteSchema = object({
  params: object({
    instituteId: string({ required_error: "session Id is required" }),
  }),
});

export const createInstituteSchema = object({
  ...payload,
});

export const updateInstituteSchema = object({
  ...payload,
  params: object({
    instituteId: string({ required_error: "institute id must be provided" }),
  }),
});

export const deleteInstituteSchema = object({
  params: object({
    instituteId: string({ required_error: "id is required" }),
  }),
});

export type createInstituteInput = TypeOf<typeof createInstituteSchema>["body"];
export type getInstituteInput = TypeOf<typeof getInstituteSchema>["params"];
export type updateInstituteInput = TypeOf<typeof updateInstituteSchema>["body"];
export type deleteInstituteInput = TypeOf<typeof deleteInstituteSchema>;
