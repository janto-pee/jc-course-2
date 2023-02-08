import express, { Request, Response } from "express";
import {
  createCourseHandler,
  deletecourseHandler,
  getAllCourseHandler,
  getFilteredCoursesHandler,
  getUniversityCoursesHandler,
  getcourseHandler,
  getfeaturedCoursesHandler,
  updatecourseHandler,
} from "../controller/course.controller";

const router = express.Router();

// router.get("/", (_, res) => res.sendStatus(200).send("ok"));

// router.get("/", getAllCourseHandler);
router.post("/", createCourseHandler);
// router.put("/:courseId", updatecourseHandler);
// router.delete("/:courseId", deletecourseHandler);

// external
router.get("/featured", getfeaturedCoursesHandler); //home
router.get("/university", getUniversityCoursesHandler); //university courses on gsprops
router.get("/filtered", getFilteredCoursesHandler); //filtering
router.get("/course/:courseId", getcourseHandler); //courseId

export default router;
