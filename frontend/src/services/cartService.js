import api from './api'; // Usa tu instancia configurada de axios

export const getCart = async () => {
    return await api.get("/cart"); // Cambia a ruta relativa (sin /api)
};

export const checkout = async () => {
    return await api.post("/cart/checkout", {}); // Usa la instancia api que ya tiene el token
};

/*import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/cart`;

export const getCart = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const checkout = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/checkout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};*/