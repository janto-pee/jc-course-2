import mongoose from "mongoose";
import config from "config";

export async function connectToDB() {
  const dbURI = config.get<string>("db");
  try {
    await mongoose.connect(dbURI);
    console.log("connected to database");
  } catch (error: any) {
    console.log(error);
    process.exit(1);
  }
}
