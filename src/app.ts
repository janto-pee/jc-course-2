import express, { Request, Response } from "express";
import { corsOption } from "./utils/cors";
import dotenv from "dotenv";
import router from "./routes";
import config from "config";
import { connectToDB } from "./utils/connectToDb";
import { deSerializeUser } from "./middleware/deserializeUser";
dotenv.config();

const app = express();
app.use(corsOption);
app.use(express.json());
app.use(deSerializeUser);
app.use(router);

const PORT = config.get<string>("PORT") || 4100;

app.listen(PORT, async () => {
  await connectToDB();
});
