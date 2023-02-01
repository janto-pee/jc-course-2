import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface InstituteInput {
  name: string;
  fullname: string;
  institutionType: string;
  instituteSummary: string;
  pmb?: string;
  address?: string;
  state?: string;
  tel?: string;
  universityType?: string;
  entryReq?: string;
  directEntry?: string;
}

export interface InstituteDocument extends InstituteInput, mongoose.Document {
  userId: UserDocument["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const InstittuteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId },
    institutionType: { type: String },
    name: { type: String },
    fullname: { type: String },
    instituteSummary: { type: String },
    pmb: { type: String },
    address: { type: String },
    state: { type: String },
    tel: { type: String },
    universityType: { type: String },
    entryReq: { type: String },
    directEntry: { type: String },
  },
  { timestamps: true }
);

const InstituteModel = mongoose.model("Institute", InstittuteSchema);
export default InstituteModel;
