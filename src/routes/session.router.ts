import express from "express";
import {
  createSessionHandler,
  getSessionsHandler,
  updateSessionHandler,
} from "../controller/session.controller";

const router = express.Router();

// router.get("/", (req, res) => {
//   res.status(200).json({ message: "Auth Route" });
// });

router.get("/sessions", getSessionsHandler);
router.put("/:sessionId", updateSessionHandler);
router.post("/session", createSessionHandler);

export default router;
