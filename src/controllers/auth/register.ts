import { Request, Response } from "express";
import { hash } from "bcrypt";
import { prisma } from "../../index";
import { createToken } from "../../utils/jwtConfig";
import { ServiceResponse } from "../../models/serviceResponse";

const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res
        .status(401)
        .json(ServiceResponse.unauthorized("Email already exists"));
      return;
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = createToken({
      userId: newUser.id,
    });

    res.status(201).json(
      ServiceResponse.create("User created successfully", {
        accessToken: token,
        user: newUser,
      })
    );
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default register;
