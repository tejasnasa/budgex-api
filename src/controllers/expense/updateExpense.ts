import { Request, Response } from "express";
import { prisma } from "../../index";
import { ServiceResponse } from "../../models/serviceResponse";

const updateExpense = async (req: Request, res: Response) => {
  const { id, name, amount, category, notes } = req.body;
  try {
    const existingExpense = await prisma.expense.findUnique({ where: { id } });

    if (!existingExpense) {
      res
        .status(401)
        .json(ServiceResponse.unauthorized("Expense doesn't exist"));
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: existingExpense.userid },
      select: { budget: true },
    });
    const updatedBudget = user!.budget + existingExpense.amount - amount;

    const [newExpense] = await prisma.$transaction([
      prisma.expense.update({
        where: { id },
        data: {
          name,
          amount,
          category,
          notes,
        },
      }),
      prisma.user.update({
        where: { id: existingExpense.userid },
        data: { budget: updatedBudget },
      }),
    ]);

    res
      .status(200)
      .json(
        ServiceResponse.success("Expense updated", { expense: newExpense })
      );
  } catch (error) {
    console.error(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
  }
};

export default updateExpense;
