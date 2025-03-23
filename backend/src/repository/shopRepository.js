import Product, { PRODUCT_PROPS } from '../models/productModel.js';

export const getLatestProducts = async () => {
    try {
      // Obtener los últimos 15 productos ordenados por fecha de creación
      return await Product.find().sort({ createdAt: -1 }).limit(15);
    } catch (error) {
      throw new Error("Error al obtener los productos más recientes");
    }
  };
export const getProductById = async (id) => {
    return await Product.findById(id);
};

export const createProduct = async (productData) => {
    const newProduct = new Product(productData);
    return await newProduct.save();
};