import express from "express";
import { shopController, productController, addProductController } from "../controllers/shopController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const shopRouter = express.Router();

shopRouter.get("/", shopController);
shopRouter.get("/product/:_id", productController);
shopRouter.post("/add-product", authMiddleware,addProductController); 

export default shopRouter;