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
    userId: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String },
    instituteSummary: { type: String },
    fullname: { type: String },
    pmb: { type: String },
    address: { type: String },
    state: { type: String },
    tel: { type: String },
    position: { type: String },
    universityType: { type: String },
    entryReq: { type: String },
    directEntry: { type: String },
    isFeatured: { type: Boolean, default: false },
    institutionType: { type: String },
  },
  { timestamps: true }
);

const InstituteModel = mongoose.model("Institute", InstittuteSchema);
export default InstituteModel;
