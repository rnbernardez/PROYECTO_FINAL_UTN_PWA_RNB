import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { shopController, productController, addProductController, updateProductController, deleteProductController } from "../controllers/shopController.js";

const shopRouter = express.Router();

shopRouter.get("/", shopController);
shopRouter.get("/product/:_id", productController);
shopRouter.post("/add-product", authMiddleware, addProductController);
shopRouter.put("/products/:_id", authMiddleware, updateProductController);
shopRouter.delete("/products/:_id", authMiddleware, deleteProductController);

export default shopRouter;