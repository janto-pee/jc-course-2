import express, { Request, Response } from "express";
import {
  createUserHandler,
  forgotPasswordHandler,
  getUsersHandler,
  resetPasswordHandler,
  verifyUserHandler,
} from "../controller/user.controller";

const router = express.Router();

// router.get("/", (req, res) => {
//   res.status(200).json({ message: `${req.body} Auth Route` });
// });

router.post("/user", createUserHandler);
router.get("/verify/:id/:verificationCode", verifyUserHandler);
router.post("/forgotpassword", forgotPasswordHandler);
router.post("/resetpassword/:id/:passwordresetcode", resetPasswordHandler);
router.get("/users", getUsersHandler);

export default router;
