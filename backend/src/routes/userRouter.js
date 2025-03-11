import express from "express";

const userRouter = express.Router();

userRouter.post("/login", loginController)
userRouter.post("/register", registerController);
userRouter.get("/profile", profileController);


export default userRouter;