import express from "express";
import authRouter from "./authRouter";
import authCheck from "../middlewares/authCheck";
import dashboard from "../controllers/dashboard";
import expenseRouter from "./expenseRouter";

const masterRouter = express.Router();

masterRouter.use("/auth", authRouter);
masterRouter.use("/expense", authCheck, expenseRouter);

masterRouter.get("/dashboard", authCheck, dashboard);

export default masterRouter;
