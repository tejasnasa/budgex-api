import express from "express";
import login from "../controllers/auth/login";
import register from "../controllers/auth/register";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/googlelogin");

export default authRouter;
