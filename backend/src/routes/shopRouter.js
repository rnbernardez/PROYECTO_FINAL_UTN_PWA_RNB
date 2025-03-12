import express from "express";
import { shopController, productController, addProductController } from "../controllers/shopController.js";

const shopRouter = express.Router();

shopRouter.get("/", shopController);
shopRouter.get("/product/:_id", productController);
shopRouter.post("/add-product", addProductController); 

export default shopRouter;