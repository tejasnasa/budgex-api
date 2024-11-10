import express from "express";
import createExpense from "../controllers/expense/createExpense";
import updateExpense from "../controllers/expense/updateExpense";
import deleteExpense from "../controllers/expense/deleteExpense";

const expenseRouter = express.Router();

expenseRouter.post("/create", createExpense);
expenseRouter.patch("/update", updateExpense);
expenseRouter.delete("/delete", deleteExpense);

export default expenseRouter;
