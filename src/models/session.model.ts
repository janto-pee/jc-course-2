import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionInput {
  valid: boolean;
  userAgent: string;
  user: UserDocument["_id"];
}

export interface SessionDocument extends SessionInput, mongoose.Document {
  createdAt: string;
  updatedAt: string;
}

const SessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    valid: { type: Boolean, required: true, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model<SessionDocument>("Session", SessionSchema);
export default SessionModel;
