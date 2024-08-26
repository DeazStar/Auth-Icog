import express from "express";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.route.js";

const app = express();

app.use(bodyParser.json());

app.use("/api/v1/auth", authRouter);

export default app;
