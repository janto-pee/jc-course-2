import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghjklmnopqrstuvwxyz0123456789", 10);

export interface UserInput {
  name: string;
  email: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  verified: boolean;
  verificationCode: string;
  passwordResetCode: null | string;
  comparePassword(confirm_password: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true, default: () => false },
    verificationCode: {
      type: String,
      required: true,
      default: () => `${nanoid()}`,
    },
    passwordResetCode: { type: String, default: () => null },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(config.get<number>("SWF"));
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  return next();
});

UserSchema.methods.comparePassword = async function (
  confirm_password: string
): Promise<boolean> {
  return bcrypt.compare(confirm_password, this.password).catch((e) => {
    return false;
  });
};

const UserModel = mongoose.model<UserDocument>("User", UserSchema);
export default UserModel;
