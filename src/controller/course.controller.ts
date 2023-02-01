import express, { Request, Response } from "express";
import { sendMail } from "../utils/nodemailer";

import { findUser, findUserByEmail } from "../services/user.service";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getCourse,
  getFeaturedCourses,
  getUniversityCourses,
  updateCourse,
} from "../services/course.services";
import { getCourseInput } from "../schemas/course.schema";
import { getDistinctFields } from "../services/queries.service";
import { getFips } from "crypto";
import { orderBy } from "lodash";
import CourseModel from "../models/course.model";

export async function getAllCourseHandler(req: Request, res: Response) {
  let page =
    typeof req.query.page !== "undefined" ? Number(req.query.page) - 1 : 0;
  let limit =
    typeof req.query.lmino !== "undefined" ? Number(req.query.lmino) : 5;
  const user = res.locals.user._doc._id;
  if (!user) {
    return res.status(401).send("unauthorised user");
  }
  const registeredUser = await findUser(user);
  if (!registeredUser) {
    return res.status(401).send("unauthorised user");
  }
  try {
    const Course = await getAllCourse(page, limit);
    const total = await CourseModel.countDocuments();
    const response = {
      error: false,
      total,
      "courses displayed": limit,
      page: page + 1,
      Course,
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function getcourseHandler(req: Request, res: Response) {
  const { courseId } = req.params;
  try {
    const course = await getCourse(courseId);
    if (!course) return res.status(400).send("course not found");
    return res.status(200).send(course);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function createCourseHandler(req: Request, res: Response) {
  const user = res.locals.user._doc._id;
  const body = req.body;
  try {
    const course = await createCourse({ ...body, userId: user });
    res.status(200).send(`course successfully created ${course}`);
  } catch (error) {
    res.status(400).send(`an error occurred ${error}`);
  }
}

export async function updatecourseHandler(req: Request, res: Response) {
  const user = res.locals.user._doc._id;
  const { courseId } = req.params;
  const body = req.body;

  const courseToBeUpdated = await getCourse(courseId);
  if (!courseToBeUpdated) {
    return res.status(400).send("course not found");
  }
  try {
    const course = await updateCourse(courseId, {
      ...body,
      userId: user,
    });
    return res.status(200).send(course);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function deletecourseHandler(req: Request, res: Response) {
  const { courseId } = req.params;
  try {
    const courseToBeDeleted = await getCourse(courseId);
    if (!courseToBeDeleted) {
      return res.status(200).send("course not found");
    }
    await deleteCourse(courseId);
    return res.status(200).send(`course successfully deleted`);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function getfeaturedCoursesHandler(req: Request, res: Response) {
  let page =
    typeof req.query.page !== "undefined" ? Number(req.query.page) - 1 : 0;
  let limit =
    typeof req.query.lmino !== "undefined" ? Number(req.query.lmino) : 5;
  try {
    const courses = await getFeaturedCourses(page, limit);
    const total = await CourseModel.countDocuments();
    const response = {
      error: false,
      total,
      "courses displayed": limit,
      page: page + 1,
      courses,
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send(error);
  }
}
export async function getUniversityCoursesHandler(req: Request, res: Response) {
  let page =
    typeof req.query.page !== "undefined" ? Number(req.query.page) - 1 : 0;
  let limit =
    typeof req.query.lmino !== "undefined" ? Number(req.query.lmino) : 5;
  try {
    const courses = await getUniversityCourses(page, limit);
    const total = await CourseModel.countDocuments();
    const response = {
      error: false,
      total,
      "courses displayed": limit,
      page: page + 1,
      courses,
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function getFilteredCoursesHandler(req: Request, res: Response) {
  let page =
    typeof req.query.page !== "undefined" ? Number(req.query.page) - 1 : 0;
  let limit =
    typeof req.query.limitno !== "undefined" ? Number(req.query.limitno) : 5;
  let search = req.query.search || "";
  let sort = req.query.sort || "department";

  search === ""
    ? (search = {})
    : (search = { name: { $regex: search, $options: "i" } });

  let department: any = req.query.department || "all";
  let faculty: any = req.query.faculty || "all";
  let institutions: any = req.query.institutions || "all";

  try {
    // get all distinct fields
    const distinctFields = await getDistinctFields();

    department === "all"
      ? (department = [...distinctFields.department])
      : (department = req.query.department?.toString().split(","));

    faculty === "all"
      ? (faculty = [...distinctFields.faculty])
      : (faculty = req.query.faculty?.toString().split(","));

    institutions === "all"
      ? (institutions = [...distinctFields.institution])
      : (institutions = req.query.institutions?.toString().split(","));

    const courses = await CourseModel.find(search)
      .where("institutions, department, faculty")
      .in([...institutions, ...faculty, ...department])
      .skip(page * limit)
      .limit(limit);

    const total = await CourseModel.countDocuments({
      search,
    });
    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      institute: [...institutions],
      faculty: [...faculty],
      courses,
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send(error);
  }
}
