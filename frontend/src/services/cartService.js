import api from './api';

export const getCart = async () => {
    try {
        const response = await api.get("/api/cart");
        return response.data; // Asegúrate de retornar response.data
    } catch (error) {
        console.error("Error al obtener carrito:", error);
        throw error;
    }
};

export const checkout = async () => {
    try {
        const response = await api.post("/api/cart/checkout", {});
        return response.data; // Asegúrate de retornar response.data
    } catch (error) {
        console.error("Error en checkout:", error);
        throw error;
    }
};