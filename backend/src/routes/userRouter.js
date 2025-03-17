import express from "express";
import { loginController, registerController, profileController } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/login", loginController)
userRouter.post("/register", registerController);
userRouter.get("/profile", authMiddleware, profileController);


export default userRouter;