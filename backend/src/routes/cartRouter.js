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

// Rutas modificadas para que coincidan con la estructura /api/cart
cartRouter.get("/", authMiddleware, cartController); // Cambiado de "/cart" a "/"
cartRouter.post("/add-card", authMiddleware, addCardController);
cartRouter.get("/checkout", authMiddleware, checkoutController);
cartRouter.post("/purchaseok", authMiddleware, purchaseOkController);
cartRouter.post("/add-product", authMiddleware, addProductToCartController); // Cambiado de "/cart/add-product"
cartRouter.delete("/remove-product/:productId", authMiddleware, removeProductFromCartController); // Cambiado de "/cart/remove-product"
cartRouter.delete("/clear", authMiddleware, clearCartController); // Cambiado de "/cart/clear"

export default cartRouter;