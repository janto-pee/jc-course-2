import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { InstituteDocument } from "./institute.models";

export interface CourseInput {
  course: string;
  courseImg: string;
  schools: string;
  schoolImg: string;
  schoolfull: string;
  courseSummary: string;
  postutme: string;
  requirement: [string];
  feesAndFunding: [string];
  ssce: [string];
  utme: [string];
  cardUtme: string;
  remark: [string];
  years: string;
  degree: string;
  degreeAbbr: string;
  mode: string;
  faculty: string;
  department: string;
  directEntry: string;
  address: string;
  isFeatured: boolean;
}

export interface CourseDocument extends CourseInput, mongoose.Document {
  userId: UserDocument["_id"];
  instituteProp: InstituteDocument["name"];
  institute: InstituteDocument["name"];
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId },
    instituteProp: { type: mongoose.Schema.Types.ObjectId },
    institute: { type: mongoose.Schema.Types.ObjectId },
    tel: { type: String },
    course: { type: String, required: true },
    courseImg: { type: String, required: true },
    schools: { type: String, required: true },
    schoolImg: { type: String, required: true },
    schoolfull: { type: String, required: true },
    courseSummary: { type: String, required: true },
    postutme: { type: String, required: true },
    requirement: { type: Array, required: true },
    feesAndFunding: { type: Array, required: true },
    ssce: { type: Array, required: true },
    utme: { type: Array, required: true },
    cardUtme: { type: String, required: true },
    remark: { type: Array, required: true },
    years: { type: String, required: true },
    degree: { type: String, required: true },
    degreeAbbr: { type: String, required: true },
    mode: { type: String, required: true },
    faculty: { type: String },
    department: { type: String, required: true },
    directEntry: { type: String, required: true },
    address: { type: String },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const CourseModel = mongoose.model("Course", CourseSchema);
export default CourseModel;
