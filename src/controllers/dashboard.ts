import { Request, Response } from "express";
import { prisma } from "../index";
import { ServiceResponse } from "../models/serviceResponse";

const dashboard = async (req: Request, res: Response) => {
  const { userId } = req.body.user;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        expenses: true,
      },
    });

    if (!user) {
      res.status(401).json(ServiceResponse.unauthorized("User doesn't exist"));
      return;
    }

    res.status(200).json(
      ServiceResponse.success("Profile shown successfully", {
        name: user.name,
        budget: user.budget,
        expenses: user.expenses,
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
  }
};

export default dashboard;
