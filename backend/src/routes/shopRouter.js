import express from "express";
import { shopController, productController, addProductController } from "../controllers/shopController.js";

const shopRouter = express.Router();

shopRouter.post("/shop", shopController)
shopRouter.post("/product/:_id", productController); /* OJO ACA!*/
shopRouter.get("/add-product", addProductController);


export default shopRouter;