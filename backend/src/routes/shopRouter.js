import express from "express";

const shopRouter = express.Router();

shopRouter.post("/shop", shopController)
shopRouter.post("/product/:_id", productController); /* OJO ACA!*/
shopRouter.get("/add-product", addProductController);


export default shopRouter;