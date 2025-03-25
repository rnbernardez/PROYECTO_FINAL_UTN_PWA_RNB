import api from "../api/api.js";

// Servicios de Autenticación
export const login = (userData) => api.post("/user/login", userData);
export const register = (userData) => api.post("/user/register", userData);
export const getProfile = () => api.get("/user/profile");

// Servicios de Tienda
export const fetchAllProducts = () => api.get("/shop");
export const fetchProduct = (id) => api.get(`/shop/product/${id}`);
export const addProduct = (productData) => api.post("/shop/add-product", productData);
export const updateProduct = (id, productData) => api.put(`/shop/products/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/shop/products/${id}`);

// Servicios de Carrito
export const getCart = () => api.get("/cart/cart");
export const addProductToCart = (productData) => api.post("/cart/cart/add-product", productData);
export const removeProductFromCart = (productId) => api.delete(`/cart/cart/remove-product/${productId}`);
export const clearCart = () => api.delete("/cart/cart/clear");