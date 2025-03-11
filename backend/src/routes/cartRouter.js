import express from "express";
import { cartController, addCardController, checkoutController, purchaseOkController } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/cart", cartController)
cartRouter.post("/add-card", addCardController); 
cartRouter.get("/checkout", checkoutController);
cartRouter.get("/purchaseok", purchaseOkController);


export default cartRouter;