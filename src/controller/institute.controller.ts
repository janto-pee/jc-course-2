import express, { Request, Response } from "express";
import { sendMail } from "../utils/nodemailer";
import {
  createInstitutes,
  deleteInstitute,
  getAllInstitutes,
  getInstitute,
  getUniversityInstitutes,
  updateInstitute,
} from "../services/institute.service";
import { findUser, findUserByEmail } from "../services/user.service";
import { getDistinctInstituteFields } from "../services/queries.service";
import InstituteModel from "../models/institute.models";

export async function getAllInstitutesHandler(req: Request, res: Response) {
  const user = res.locals.user._doc._id;
  let page =
    typeof req.query.page !== "undefined" ? Number(req.query.page) - 1 : 0;
  let limit =
    typeof req.query.limitno !== "undefined" ? Number(req.query.limitno) : 10;

  const registeredUser = await findUser(user);
  if (!registeredUser) {
    return res.status(401).send("unauthorised user");
  }
  try {
    const institutes = await getAllInstitutes(page, limit);
    if (!institutes) return res.status(404).send("none found");

    const total = await InstituteModel.countDocuments();

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      institutes,
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send(error);
  }
}
export async function getInstituteHandler(req: Request, res: Response) {
  const { instituteId } = req.params;
  try {
    const institute = await getInstitute(instituteId);
    return res.status(200).send(institute);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function createInstitutesHandler(req: Request, res: Response) {
  const user = res.locals.user._doc._id;
  const body = req.body;
  try {
    const institute = await createInstitutes({ ...body, userId: user });
    res.status(200).send(`institute successfully created ${institute}`);
  } catch (error) {
    res.status(400).send(`an error occurred`);
  }
}
export async function updateInstituteHandler(req: Request, res: Response) {
  const user = res.locals.user._doc._id;
  const { instituteId } = req.params;
  const body = req.body;
  try {
    const updateToBeInstitute = await getInstitute(instituteId);
    if (!updateToBeInstitute) {
      return res.status(400).send("institute not found");
    }
    const institute = await updateInstitute(instituteId, {
      ...body,
      userId: user,
    });
    return res.status(200).send("successfully updated");
  } catch (error) {
    return res.status(400).send(error);
  }
}
export async function deleteInstituteHandler(req: Request, res: Response) {
  const { instituteId } = req.params;
  try {
    const instituteToBeDeleted = await getInstitute(instituteId);
    if (!instituteToBeDeleted) {
      return res.status(400).send("institute not found");
    }
    await deleteInstitute(instituteId);
    return res.status(200).send(`institute successfully deleted`);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function getUniversityInstituesHandler(
  req: Request,
  res: Response
) {
  try {
    const courses = await getUniversityInstitutes();
    return res.status(200).send(courses);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function getFilteredInstitutesHandler(
  req: Request,
  res: Response
) {
  try {
    let page =
      typeof req.query.page !== "undefined" ? Number(req.query.page) - 1 : 0;
    let limit =
      typeof req.query.limitno !== "undefined" ? Number(req.query.limitno) : 5;
    let search = req.query.search || "";
    let state: any = req.query.state || "all";
    let institutions: any = req.query.institutions || "all";

    search === ""
      ? (search = {})
      : (search = { name: { $regex: search, $options: "i" } });

    //get all distinct fields
    const distinctFields = await getDistinctInstituteFields();

    state === "all"
      ? (state = [...distinctFields.state])
      : (state = req.query.state?.toString().split(","));

    institutions === "all"
      ? (institutions = [...distinctFields.institution])
      : (institutions = req.query.institutions?.toString().split(","));

    const courses = await InstituteModel.find(search)
      .where("institutions, state")
      .in([...institutions, ...state])
      .skip(page * limit)
      .limit(limit);

    if (!courses) return res.status(404).send("none found");

    const total = await InstituteModel.countDocuments({
      institute: { $in: [...institutions] },
      search,
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      institute: [...institutions],
      courses,
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send(error);
  }
}
