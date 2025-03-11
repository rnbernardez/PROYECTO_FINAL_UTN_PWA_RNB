import express from "express";

const cartRouter = express.Router();

cartRouter.post("/cart", cartController)
cartRouter.post("/add-card", addCardController); 
cartRouter.get("/checkout", checkoutController);
cartRouter.get("/purchaseok", purchaseOkController);


export default cartRouter;