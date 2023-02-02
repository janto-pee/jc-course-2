import mongoose from "mongoose";
import { InstituteDocument } from "./institute.models";

export interface CourseInput {
  utme: [string];
  course: string;
  image: string;
  schools: string;
  courseSummary: string;
  postutme: string;
  requirement?: [string];
  feesAndFunding?: [string];
  ssce: [string];
  remark?: [string];
  years: string;
  degree: string;
  degreeAbbr: string;
  mode: string;
  faculty: string;
  directEntry?: string;
  isFeatured: boolean;
  institutionType: string;
}

export interface CourseDocument extends CourseInput, mongoose.Document {
  institute: InstituteDocument["name"];
  address: InstituteDocument["address"];
  schoolfull: InstituteDocument["fullname"];
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new mongoose.Schema(
  {
    course: { type: String, required: true },
    schools: { type: String, required: true },
    institute: { type: mongoose.Schema.Types.ObjectId },
    ssce: { type: Array, required: true },
    utme: { type: String, required: true },
    years: { type: String, required: true },
    degree: { type: String, required: true },
    degreeAbbr: { type: String, required: true },
    mode: { type: String, required: true },
    faculty: { type: String },
    courseSummary: { type: String, required: true },
    image: { type: String },
    isFeatured: { type: Boolean, default: false },
    postutme: { type: String, required: true },
    requirement: { type: Array },
    feesAndFunding: { type: Array },
    remark: { type: Array },
    directEntry: { type: String },
    address: { type: mongoose.Schema.Types.ObjectId },
    schoolfull: { type: mongoose.Schema.Types.ObjectId },
    institutionType: { type: String },
  },
  { timestamps: true }
);

const CourseModel = mongoose.model<CourseDocument>("Course", CourseSchema);
export default CourseModel;
