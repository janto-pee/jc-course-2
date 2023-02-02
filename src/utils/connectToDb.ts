import mongoose from "mongoose";
import config from "config";
import dotenv from "dotenv";
dotenv.config();

export async function connectToDB() {
  const dbURI = config.get<string>("db");
  try {
    await mongoose.connect(dbURI);
    console.log("connected to database");
  } catch (error: any) {
    process.exit(1);
  }
}
