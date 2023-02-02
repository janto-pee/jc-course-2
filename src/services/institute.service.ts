import InstituteModel, { InstituteInput } from "../models/institute.models";
import UserModel from "../models/user.model";

export async function getAllInstitutes(page: number, limit: number) {
  const institute = await InstituteModel.find()
    .skip(page * limit)
    .limit(limit);
  return institute;
}
export async function getInstitute(id: string) {
  const institute = await InstituteModel.findById(id);
  return institute;
}
export async function createInstitutes(input: InstituteInput) {
  const institute = await InstituteModel.create(input);
  return institute;
}
export async function updateInstitute(id: string, update: InstituteInput) {
  const institute = await InstituteModel.findByIdAndUpdate(id, update);
  return institute;
}
export async function deleteInstitute(id: string) {
  const institute = await InstituteModel.findByIdAndDelete(id);
  return institute;
}

export async function getFeaturedInstitute(page: number, limit: number) {
  const Course = await InstituteModel.find({ isFeatured: true })
    .select("_id schools course utme address years degreeAbbr")
    .skip(page * limit)
    .limit(limit);
  return Course;
}
export async function getUniversityInstitutes(page: number, limit: number) {
  const Course = await InstituteModel.find({
    instutionType: { $regex: "University", $options: "i" },
  })
    .skip(page * limit)
    .limit(limit);
  return Course;
}
