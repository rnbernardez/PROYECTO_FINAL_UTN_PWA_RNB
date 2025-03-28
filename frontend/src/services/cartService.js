import api from './api';

export const getCart = async () => {
    const response = await api.get("/api/cart");
    return response.data;
};

export const checkout = async () => {
    const response = await api.post("/api/cart/checkout", {});
    return response.data;
};