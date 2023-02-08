import mongoose from "mongoose";
import { InstituteDocument, InstituteInput } from "./institute.models";

export interface CourseInput {
  utme: string;
  course: string;
  image: string;
  schools: string;
  courseSummary: string;
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
  instituteProp: InstituteDocument["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new mongoose.Schema(
  {
    course: { type: String, required: true },
    schools: { type: String, required: true },
    ssce: { type: Array, required: true },
    utme: { type: String, required: true },
    years: { type: String, required: true },
    degree: { type: String, required: true },
    degreeAbbr: { type: String, required: true },
    mode: { type: String, required: true },
    faculty: { type: String },
    courseSummary: { type: String },
    image: { type: String },
    isFeatured: { type: Boolean, default: false },
    requirement: { type: Array },
    remark: { type: Array },
    directEntry: { type: String },
    institutionType: { type: String },
    instituteProp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
    },
  },
  { timestamps: true }
);

const CourseModel = mongoose.model<CourseDocument>(
  "Course",
  CourseSchema,
  "courses"
);
export default CourseModel;
