import express, { Request, Response } from "express";
import {
  createInstitutesHandler,
  deleteInstituteHandler,
  getAllInstitutesHandler,
  getFilteredInstitutesHandler,
  getInstituteHandler,
  getUniversityInstituesHandler,
  updateInstituteHandler,
} from "../controller/institute.controller";

const router = express.Router();

router.get("/", getAllInstitutesHandler);
// router.get("/icj/:instituteId", getInstituteHandler);
router.post("/", createInstitutesHandler);
router.put("/:instituteId", updateInstituteHandler);
router.delete("/:instituteId", deleteInstituteHandler);

// external
router.get("/university", getUniversityInstituesHandler); //university courses on gsprops
router.get("/filter", getFilteredInstitutesHandler); //filtering
router.get("/institute/:instituteId", getInstituteHandler);

export default router;
