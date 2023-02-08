import cors from "cors";

const corsOptions = {
  origin: [
    "https://jc-project.vercel.app/",
    "postutmeportal.com.ng/",
    "localhost:3000",
  ],
  optionsSuccessStatus: 200,
};

export const corsOption = cors(corsOptions);
