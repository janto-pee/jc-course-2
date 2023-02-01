import express, { Request, Response } from "express";
import SessionRouter from "./session.router";
import UserRouter from "./user.router";
import CoursesRouter from "./course.router";
import InstitutionRouter from "./institutute.router";

const router = express.Router();
router.use("/api/auth", SessionRouter);
router.use("/api/user", UserRouter);
router.use("/api/courses", CoursesRouter);
router.use("/api/institutions", InstitutionRouter);

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "first end point created" });
});

export default router;
