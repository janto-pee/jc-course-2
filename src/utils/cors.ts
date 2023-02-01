import cors from "cors";

const corsOptions = {
  origin: "http://localhost:4100",
  optionsSuccessStatus: 200,
};

export const corsOption = cors(corsOptions);
