import { string, object, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({ required_error: "name is required" }),
    fullname: string({ required_error: "  fullname is required" }),
    CourseSummary: string({ required_error: "  CourseSummary is required" }),
    pmb: string({ required_error: "  pmb is required" }),
    address: string({ required_error: "  address is required" }),
    tel: string({ required_error: "  tel is required" }),
  }),
};

export const getCourseSchema = object({
  params: object({
    courseId: string({ required_error: "session Id is required" }),
  }),
});

export const createCourseSchema = object({
  ...payload,
});

export const updateCourseSchema = object({
  ...payload,
  params: object({
    courseId: string({ required_error: "course id must be provided" }),
  }),
});

export const deleteCourseSchema = object({
  params: object({
    courseId: string({ required_error: "id is required" }),
  }),
});

export type createCourseInput = TypeOf<typeof createCourseSchema>["body"];
export type getCourseInput = TypeOf<typeof getCourseSchema>["params"];
export type updateCourseInput = TypeOf<typeof updateCourseSchema>["body"];
export type deleteCourseInput = TypeOf<typeof deleteCourseSchema>;
