import api from "../api/api.js";

// Servicios de Autenticación
export const login = (userData) => api.post("/api/user/login", userData);
export const register = (userData) => api.post("/api/user/register", userData);
export const getProfile = () => api.get("/api/user/profile");

// Servicios de Tienda
export const fetchAllProducts = () => api.get("/api/shop");
export const fetchProduct = (id) => api.get(`/api/shop/product/${id}`);
export const addProduct = (productData) => api.post("/api/shop/add-product", productData);
export const updateProduct = (id, productData) => api.put(`/api/shop/products/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/api/shop/products/${id}`);

// Servicios de Carrito
export const getCart = () => api.get("/api/cart/cart");
export const addProductToCart = (productData) => api.post("/api/cart/cart/add-product", productData);
export const removeProductFromCart = (productId) => api.delete(`/api/cart/cart/remove-product/${productId}`);
export const clearCart = () => api.delete("/api/cart/cart/clear");