import express, { Request, Response } from "express";
import { sendMail } from "../utils/nodemailer";

import { findUser } from "../services/user.service";
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
import CourseModel, { CourseDocument } from "../models/course.model";
import { InstituteDocument } from "../models/institute.models";
import mongoose from "mongoose";

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

export async function createCourseHandler(req: Request, res: Response) {
  const user = res.locals.user._doc._id;
  const body = req.body;
  try {
    const course = await createCourse({ ...body });
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

/**
 *
 * Exposed API ROUTE
 *
 */

export async function getcourseHandler(req: Request, res: Response) {
  const { courseId } = req.params;
  try {
    const course = await getCourse(courseId);
    if (!course) return res.status(400).send("course not found");
    const total = {
      error: false,
      course,
    };
    return res.status(200).send(total);
  } catch (error) {
    return res.status(400).send("course not found");
  }
}

export async function getfeaturedCoursesHandler(req: Request, res: Response) {
  let page =
    typeof req.query.page !== "undefined" ? Number(req.query.page) - 1 : 0;
  let limit =
    typeof req.query.lmino !== "undefined" ? Number(req.query.lmino) : 10;
  try {
    const courses = await getFeaturedCourses(page, limit);
    const total = await CourseModel.countDocuments();
    courses.length > 15 ? courses.filter((item, index) => index < 15) : courses;
    const response = {
      error: false,
      total,
      "courses displayed": courses.length,
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
    typeof req.query.lmino !== "undefined" ? Number(req.query.lmino) : 10;
  try {
    const courses = await getUniversityCourses(page, limit);
    courses.length > 15 ? courses.filter((item, index) => index < 15) : courses;
    const total = await CourseModel.countDocuments();
    const response = {
      error: false,
      total,
      "courses displayed": courses.length,
      page: page + 1,
      courses,
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function getFilteredCoursesHandler(req: Request, res: Response) {
  let search = req.query.search || "";
  let department = req.query.department || "all";
  let faculty = req.query.faculty || "all";
  let institution = req.query.institution || "all";
  let page =
    typeof req.query.page !== "undefined" ? Number(req.query.page) - 1 : 0;
  let limit =
    typeof req.query.wmtno !== "undefined" ? Number(req.query.wmtno) : 10;

  search === ""
    ? (search = {})
    : (search = { course: { $regex: search, $options: "i" } });

  faculty === "all" || ""
    ? (faculty = {})
    : (faculty = {
        faculty: req.query.faculty?.toString().split(","),
      });
  department === "all" || ""
    ? (department = {})
    : (department = {
        course: req.query.department?.toString().split(","),
      });
  institution === "all" || ""
    ? (institution = {})
    : (institution = {
        institutionType: req.query.institution?.toString().split(","),
      });

  try {
    const filter = {
      ...search,
      ...faculty,
      ...department,
      ...institution,
    };

    const courses = await CourseModel.find({ ...filter })
      .select("_id schools course utme address years degreeAbbr faculty")
      .skip(page * limit)
      .limit(limit);

    if (!courses) {
      return res.status(400).send("an error occurred, unable to fetch");
    }
    courses.length > 15 ? courses.filter((item, index) => index < 15) : courses;
    const total = await CourseModel.countDocuments();
    const distinctFields = await getDistinctFields();

    const response = {
      error: false,
      total,
      page: page + 1,
      "displayed result": courses.length,
      department: `over ${distinctFields.department.length} departments`,
      faculty: distinctFields,
      institution: distinctFields.institution,
      courses,
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(404).send(error);
  }
}
