import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { shopController, productController, addProductController, updateProductController, deleteProductController } from "../controllers/shopController.js";

const shopRouter = express.Router();

// Ruta para obtener todos los productos
shopRouter.get("/", shopController);

// Ruta para obtener un producto específico
shopRouter.get("/product/:_id", productController);

// Ruta para agregar un nuevo producto
shopRouter.post("/add-product", authMiddleware, addProductController);

// Ruta para actualizar un producto
shopRouter.put("/products/:_id", authMiddleware, updateProductController);

// Ruta para eliminar un producto
shopRouter.delete("/products/:_id", authMiddleware, deleteProductController);

export default shopRouter;