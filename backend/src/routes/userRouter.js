import express from "express";
import { loginController, registerController, profileController, verifyAccountController } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/login", loginController)
userRouter.post("/register", registerController);
userRouter.get("/profile", authMiddleware, profileController);
userRouter.get("/verify/:token", verifyAccountController);


export default userRouter;