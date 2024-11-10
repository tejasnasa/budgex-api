import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import masterRouter from "./routes/masterRouter";

config();

const app = express();

app.use(morgan("dev"));

app.use("/v1", masterRouter);

export default app;
