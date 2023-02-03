import cors from "cors";

const corsOptions = {
  origin: [
    "https://jc-project.vercel.app/",
    "jambcourses.com.ng",
    "localhost:3000/",
  ],
  optionsSuccessStatus: 200,
};

export const corsOption = cors(corsOptions);
