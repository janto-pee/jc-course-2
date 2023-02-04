import CourseModel, { CourseInput } from "../models/course.model";
import InstituteModel from "../models/institute.models";

export async function getDistinctFields() {
  const department = await CourseModel.find().distinct("course");
  const faculty = await CourseModel.find().distinct("faculty");
  const institution = await CourseModel.find().distinct("institutionType");
  const res = { faculty, department, institution };
  return res;
}
export async function getDistinctInstituteFields() {
  const state = await InstituteModel.find().distinct("state");
  const institution = await InstituteModel.find().distinct("institutionType");
  const res = { state, institution };
  return res;
}
