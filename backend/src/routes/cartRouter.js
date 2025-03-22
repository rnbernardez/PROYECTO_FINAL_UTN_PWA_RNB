import express from "express";
import { 
    cartController, 
    addCardController, 
    checkoutController, 
    purchaseOkController, 
    addProductToCartController, 
    clearCartController, 
    removeProductFromCartController } from "../controllers/cartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.get("/cart", authMiddleware, cartController);
cartRouter.post("/add-card", authMiddleware, addCardController);
cartRouter.get("/checkout", authMiddleware, checkoutController);
cartRouter.post("/purchaseok", authMiddleware, purchaseOkController);
cartRouter.post("/cart/add-product", authMiddleware, addProductToCartController);
cartRouter.delete("/cart/remove-product/:productId", authMiddleware, removeProductFromCartController);
cartRouter.delete("/cart/clear", authMiddleware, clearCartController);

export default cartRouter;