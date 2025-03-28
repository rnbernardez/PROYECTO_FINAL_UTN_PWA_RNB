import api from './api';

export const getCart = async () => {
    return await api.get("/api/cart"); // Asegúrate que sea EXACTAMENTE esta ruta
};

export const checkout = async () => {
    return await api.post("/api/cart/checkout", {});
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