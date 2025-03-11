import express from "express";
import { loginController, registerController, profileController } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginController)
userRouter.post("/register", registerController);
userRouter.get("/profile", profileController);


export default userRouter;