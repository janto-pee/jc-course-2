import mongoose from "mongoose";
import { InstituteDocument, InstituteInput } from "./institute.models";

export interface CourseInput {
  utme: [string];
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

// address: InstituteDocument["address"];
// fullSchoolName?: InstituteDocument["fullname"];
// entryRequirement?: InstituteDocument["entryReq"];
// postUtme?: InstituteDocument["postUtme"];
// schoolFee?: InstituteDocument["feesAndFunding"];
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

// postUtme: { type: mongoose.Schema.Types.ObjectId, ref: "Institute" },
// schoolFee: { type: mongoose.Schema.Types.ObjectId, ref: "Institute" },
// address: { type: mongoose.Schema.Types.ObjectId, ref: "Institute" },
// fullSchoolName: { type: mongoose.Schema.Types.ObjectId, ref: "Institute" },
// entryRequirement: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "Institute",
// },
const CourseModel = mongoose.model<CourseDocument>("Course", CourseSchema);
export default CourseModel;
