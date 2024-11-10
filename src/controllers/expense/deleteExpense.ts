import { Request, Response } from "express";
import { prisma } from "../../index";
import { ServiceResponse } from "../../models/serviceResponse";

const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.body;
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
    const updatedBudget = user!.budget + existingExpense.amount;

    await prisma.$transaction([
      prisma.expense.delete({ where: { id } }),
      prisma.user.update({
        where: { id: existingExpense.userid },
        data: { budget: updatedBudget },
      }),
    ]);

    res
      .status(200)
      .json(
        ServiceResponse.success(
          "Expense deleted and budget updated successfully"
        )
      );
  } catch (error) {
    console.error(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
  }
};

export default deleteExpense;
