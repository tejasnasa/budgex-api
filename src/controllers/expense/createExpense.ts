import { Request, Response } from "express";
import { prisma } from "../../index";
import { ServiceResponse } from "../../models/serviceResponse";

const createExpense = async (req: Request, res: Response) => {
  const { userId } = req.body.user;
  const { name, amount, date, category, notes } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { budget: true },
    });

    if (!user) {
      res.status(404).json(ServiceResponse.notFound("User not found"));
      return;
    }

    const updatedBudget = user.budget - amount;

    const [newExpense] = await prisma.$transaction([
      prisma.expense.create({
        data: { userid: userId, name, amount, date, category, notes },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { budget: updatedBudget },
      }),
    ]);

    res.status(200).json(
      ServiceResponse.success("Expense created and budget updated", {
        expense: newExpense,
        updatedBudget: updatedBudget,
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
  }
};

export default createExpense;
