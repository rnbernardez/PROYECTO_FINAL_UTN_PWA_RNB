import Product, { PRODUCT_PROPS } from '../models/productModel.js';

export const getAllProducts = async () => {
    return await Product.find();
};

export const getProductById = async (id) => {
    return await Product.findById(id);
};

export const createProduct = async (productData) => {
    const newProduct = new Product(productData);
    return await newProduct.save();
};