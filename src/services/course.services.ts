import CourseModel, { CourseInput } from "../models/course.model";

export async function getAllCourse(page: number, limit: number) {
  const Course = await CourseModel.find()
    .skip(page * limit)
    .limit(limit);
  return Course;
}
export async function getCourse(id: string) {
  const Course = await CourseModel.findById(id);
  return Course;
}
export async function createCourse(input: CourseInput) {
  const Course = await CourseModel.create(input);
  return Course;
}
export async function updateCourse(id: string, update: CourseInput) {
  const Course = await CourseModel.findByIdAndUpdate(id, update);
  return Course;
}
export async function deleteCourse(id: string) {
  const Course = await CourseModel.findByIdAndDelete(id);
  return Course;
}

export async function getFeaturedCourses(page: number, limit: number) {
  const Course = await CourseModel.find()
    .select("_id course courseImg")
    .skip(page * limit)
    .limit(limit);
  return Course;
}
export async function getUniversityCourses(page: number, limit: number) {
  const Course = await CourseModel.find({
    institutionType: "university",
  })
    .select("_id course courseImg")
    .skip(page * limit)
    .limit(limit);
  return Course;
}
