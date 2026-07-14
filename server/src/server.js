import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import "./db/index.js";

import routes from "./routes/index.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(
  cors({
     origin: [
        "http://localhost:5173",
        "https://ai-personal-finance-platform.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/api", routes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});