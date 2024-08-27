import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import errorHandler from "./error/errorHandler.error.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ["Authorization", "X-Refresh-Token"],
  }),
);

app.use(cookieParser());

app.use(bodyParser.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use(errorHandler);
export default app;
