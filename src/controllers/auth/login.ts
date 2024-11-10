import { Request, Response } from "express";
import { prisma } from "../../index";
import { compare } from "bcrypt";
import { createToken } from "../../utils/jwtConfig";
import { ServiceResponse } from "../../models/serviceResponse";

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(401).json(ServiceResponse.unauthorized("User doesn't exist"));
      return;
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(401).json(ServiceResponse.unauthorized("Invalid credentials"));
      return;
    }

    const token = createToken({
      userId: user.id,
    });

    res.status(200).json(
      ServiceResponse.success("Sign-in successful", {
        accessToken: token,
        user: {
          email: user.email,
          name: user.name,
        },
      })
    );
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default login;
