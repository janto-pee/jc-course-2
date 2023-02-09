import cors from "cors";

export const corsOptions = {
  origin: [
    "https://jc-project.vercel.app/",
    "https://postutmeportal.com.ng",
    "postutmeportal.com.ng",
    "http://localhost:3000",
  ],
  optionsSuccessStatus: 200,
};
