import express from "express";
import { cartController, addCardController, checkoutController, purchaseOkController } from "../controllers/cartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.get("/cart", authMiddleware, cartController);
cartRouter.post("/add-card", authMiddleware, addCardController);
cartRouter.get("/checkout", authMiddleware, checkoutController);
cartRouter.post("/purchaseok", authMiddleware, purchaseOkController);

export default cartRouter;

/*
Nuevas rutas recomendadas:
✅ POST /cart/add-product para agregar productos al carrito.
✅ DELETE /cart/remove-product/:productId para eliminar productos específicos.
✅ DELETE /cart/clear para vaciar el carrito.
*/
