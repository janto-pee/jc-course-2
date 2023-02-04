import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { CourseDocument } from "./course.model";

export interface InstituteInput {
  name: string;
  fullSchoolName: string;
  institutionType: string;
  instituteSummary: string;
  pmb?: string;
  address?: string;
  state?: string;
  tel?: string;
  universityType?: string;
  postUtme: string;
  schoolFee: [];
  entryRequirement?: string;
  directEntry?: string;
  isFeatured?: Boolean;
  position?: string;
}

export interface InstituteDocument extends InstituteInput, mongoose.Document {
  userId: UserDocument["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const InstittuteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String },
    instituteSummary: { type: String },
    fullSchoolName: { type: String },
    pmb: { type: String },
    address: { type: String },
    state: { type: String },
    tel: { type: String },
    position: { type: String },
    universityType: { type: String },
    entryRequirement: { type: String },
    directEntry: { type: String },
    postUtme: { type: String },
    schoolFee: { type: Array },
    isFeatured: { type: Boolean, default: false },
    institutionType: { type: String },
  },
  { timestamps: true }
);

const InstituteModel = mongoose.model<InstituteDocument>(
  "Institute",
  InstittuteSchema
);
export default InstituteModel;
