import CourseModel, { CourseInput } from "../models/course.model";

export async function getDistinctFields() {
  const department = await CourseModel.find().distinct("name");
  const faculty = await CourseModel.find().distinct("faculty");
  const institution = await CourseModel.find().distinct("institutionType");
  const res = { faculty, department, institution };
  return res;
}
export async function getDistinctInstituteFields() {
  const state = await CourseModel.find().distinct("state");
  const institution = await CourseModel.find().distinct("instutionType");
  const res = { state, institution };
  return res;
}
